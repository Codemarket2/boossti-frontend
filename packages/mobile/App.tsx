/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import Amplify from 'aws-amplify';
import config from '@frontend/shared/aws-exports';
import { ApolloProvider } from '@apollo/client/react';
import { useCurrentAuthenticatedUser } from '@frontend/shared/hooks/auth';
import { client } from '@frontend/shared/graphql';
import { PersistGate } from 'redux-persist/integration/react';
import MainStack from './src/navigation/MainStack';
import { store, persistor } from './src/utils/store';

// import StorybookUI from './storybook';

Amplify.configure(config);

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <PaperProvider>
              <InitialData />
              <MainStack />
            </PaperProvider>
          </NavigationContainer>
        </ApolloProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

// InitialData - This Component is created because the useCurrentAuthenticatedUser hook need to be call inside redux provider
const InitialData = () => {
  useCurrentAuthenticatedUser();
  return null;
};

// const startStorybook = false;
// export default startStorybook ? StorybookUI : App;
export default App;
