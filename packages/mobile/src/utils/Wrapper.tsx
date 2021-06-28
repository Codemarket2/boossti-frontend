import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider as StyledProvider } from 'styled-components/native';
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
// import { Provider as PaperProvider } from 'react-native-paper';
// import { ApolloProvider } from '@apollo/client/react';
// import { client } from '@frontend/shared/graphql';
import { store } from '@frontend/shared/redux';

interface IProps {
  children: React.ReactNode;
}

const theme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
  },
};

export default function Wrapper({ children }: IProps) {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <StyledProvider theme={theme}>{children}</StyledProvider>
      </PaperProvider>
      {/* <ApolloProvider client={client}>
        <NavigationContainer>
          <PaperProvider>{children}</PaperProvider>
        </NavigationContainer>
      </ApolloProvider> */}
    </ReduxProvider>
  );
}
