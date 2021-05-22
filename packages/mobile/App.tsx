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
// import { createStore } from 'redux';
import { ApolloProvider } from '@apollo/client/react';
// import { useInitialUser } from '@frontend/shared/hooks/users';
// @t s-ignore
import { client } from '@frontend/shared/graphql';
import { store } from '@frontend/shared/redux';
// import StorybookUI from './storybook';
import MainStack from './src/navigation/MainStack';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <PaperProvider>
            <MainStack />
          </PaperProvider>
        </NavigationContainer>
      </ApolloProvider>
    </ReduxProvider>
  );
};

// function Data() {
//   console.log('Data');
//   useInitialUser();
//   return null;
// }

// const startStorybook = false;
// export default startStorybook ? StorybookUI : App;
export default App;
