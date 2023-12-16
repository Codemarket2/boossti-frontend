/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { Linking, Alert, Platform, View, Text } from 'react-native';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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

// vivek
import { Provider as ReduxProvider, useSelector, useDispatch } from 'react-redux';
import Amplify, { Auth } from 'aws-amplify';
//import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
//import awsconfig from '@frontend/shared/aws-exports';
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
import { useOneSignal } from './src/utils/onesignal';
// import StorybookUI from './storybook';

// Amplify.configure(config);

/*async function urlOpener(url: any, redirectUrl: any) {
  try {
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
  } catch (error) {
    console.log('error urlOpener==', error);
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
}; */
const PRODUCTS = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
];

function FilterableProductTable({ product }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const router = Router;

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable product={product} filterText={filterText} inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th>{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ product, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  product.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{' '}
        Only show products in stock
      </label>
    </form>
  );
}

const App = () => {
  /*interface product {
    name: string;
  category: string;
    price: string;
    stocked: boolean;
  }*/

  return (
    <View>
      <Text>Users</Text>
    </View>
  );
};

// export default function App() {
//   return (
//     <Router>
//       <Route path="/test">
//         <FilterableProductTable products={PRODUCTS} />;
//       </Route>
//     </Router>
//   );
// }

/*  return (
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
  );*/

// {  return <FilterableProductTable product={PRODUCTS} />; }

/*
// InitialData - This Component is created because the useCurrentAuthenticatedUser hook need to be call inside redux provider
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { getUser } = useCurrentAuthenticatedUser();
  useOneSignal();
  const darkMode = useSelector(({ auth }: any) => auth.darkMode);
  const dispatch = useDispatch();
  let theme = darkMode ? CombinedDarkTheme : CombinedDefaultTheme;

  const handleOpenURL = async (event: any) => {
    if (event.url && event.url.includes('GOOGLE_ACCOUNT_LINKED')) {
      Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
    } else if (event.url && event.url.includes('FACEBOOK_ACCOUNT_LINKED')) {
      Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook });
    } else if (event.url && event.url.includes('?code')) {
      dispatch(toggleAuthLoading(true));
      const userId = await getUser();
      await onSignIn(userId);
    }
  };

  useEffect(() => {
    // if (Platform.OS === 'android') {
    //   Linking.getInitialURL().then((url2) => {
    //     handleOpenURL({ url: url2 });
    //   });
    // } else {
    //   Linking.addEventListener('url', handleOpenURL);
    // }
    Linking.addEventListener('url', handleOpenURL);

    // Hub.listen('auth', ({ payload: { event, data } }) => {
    //   switch (event) {
    //     case 'signIn':
    //     case 'cognitoHostedUI':
    //       // console.log('cognitoHostedUI', event, data);
    //       // getUser();
    //       break;
    //     case 'signOut':
    //     case 'signIn_failure':
    //     case 'cognitoHostedUI_failure':
    //       // console.log('cognitoHostedUI_failure', event, data);
    //       // Alert.alert('Error', 'Sign in failed please try again');
    //       // console.log('Sign in failure', data);
    //       break;
    //   }
    // });
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
*/
// const startStorybook = false;
// export default startStorybook ? StorybookUI : App;
export default App;
