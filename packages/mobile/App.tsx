/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { Linking, Alert, Platform } from 'react-native';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import { Provider as ReduxProvider, useSelector, useDispatch } from 'react-redux';
import Amplify, { Hub } from 'aws-amplify';
import awsconfig from '@frontend/shared/aws-exports';
import { ApolloProvider } from '@apollo/client/react';
import { useCurrentAuthenticatedUser } from '@frontend/shared/hooks/auth';
import { toggleAuthLoading } from '@frontend/shared/redux/actions/auth';
import { client } from '@frontend/shared/graphql';
import { ThemeProvider as StyledProvider } from 'styled-components/native';
import { PersistGate } from 'redux-persist/integration/react';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import MainStack from './src/navigation/MainStack';
import { store, persistor } from './src/utils/store';
import AuthLoadingModal from './src/components/auth/AuthLoadingModal';
// import StorybookUI from './storybook';

// Amplify.configure(config);

async function urlOpener(url: any, redirectUrl: any) {
  await InAppBrowser.isAvailable();
  const { type, url: newUrl } = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  // let splitUrl = newUrl;
  // if (splitUrl && splitUrl.includes('?code')) {
  //   splitUrl = `drreamz://?${newUrl.split('#_=_')[0].split('?')[1] || ''}`;
  // }

  // if (type === 'success') {
  //   Linking.openURL(splitUrl);
  // }

  if (type === 'success') {
    Linking.openURL(newUrl);
  }
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: 'drreamz://',
    redirectSignOut: 'drreamz://',
    urlOpener,
  },
});

const CombinedDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
  },
};

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <Wrapper>
            <AuthLoadingModal />
            <MainStack />
          </Wrapper>
        </ApolloProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

// InitialData - This Component is created because the useCurrentAuthenticatedUser hook need to be call inside redux provider
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { getUser } = useCurrentAuthenticatedUser();
  const darkMode = useSelector(({ auth }: any) => auth.darkMode);
  const dispatch = useDispatch();
  let theme = darkMode ? CombinedDarkTheme : CombinedDefaultTheme;

  const handleOpenURL = (event) => {
    if (event.url && event.url.includes('?code')) {
      dispatch(toggleAuthLoading(true));
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url2) => {
        handleOpenURL({ url: url2 });
      });
    } else {
      Linking.addEventListener('url', handleOpenURL);
    }
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          // console.log('cognitoHostedUI', data);
          getUser();
          break;
        case 'signOut':
          console.log('signOut');
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          Alert.alert('Error', 'Sign in failed please try again');
          // console.log('Sign in failure', data);
          break;
      }
    });
    return () => Linking.removeEventListener('url', handleOpenURL);
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <PaperProvider theme={theme}>
        <StyledProvider theme={theme}>{children}</StyledProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

// const startStorybook = false;
// export default startStorybook ? StorybookUI : App;
export default App;
