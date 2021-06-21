import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
// import { NavigationContainer } from '@react-navigation/native';
// import { Provider as PaperProvider } from 'react-native-paper';
// import { ApolloProvider } from '@apollo/client/react';
// import { client } from '@frontend/shared/graphql';
import { store } from '@frontend/shared/redux';

interface IProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: IProps) {
  return (
    <ReduxProvider store={store}>
      {children}
      {/* <ApolloProvider client={client}>
        <NavigationContainer>
          <PaperProvider>{children}</PaperProvider>
        </NavigationContainer>
      </ApolloProvider> */}
    </ReduxProvider>
  );
}
