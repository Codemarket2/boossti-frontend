/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
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
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import Amplify from 'aws-amplify';
import config from '@frontend/shared/aws-exports';
import { ApolloProvider } from '@apollo/client/react';
import { useCurrentAuthenticatedUser } from '@frontend/shared/hooks/auth';
import { client } from '@frontend/shared/graphql';
import { ThemeProvider as StyledProvider } from 'styled-components/native';
import { PersistGate } from 'redux-persist/integration/react';
import MainStack from './src/navigation/MainStack';
import { store, persistor } from './src/utils/store';
// import StorybookUI from './storybook';

Amplify.configure(config);

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
            <MainStack />
          </Wrapper>
        </ApolloProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

// InitialData - This Component is created because the useCurrentAuthenticatedUser hook need to be call inside redux provider
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  useCurrentAuthenticatedUser();
  const darkMode = useSelector(({ auth }: any) => auth.darkMode);
  let theme = darkMode ? CombinedDarkTheme : CombinedDefaultTheme;
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
