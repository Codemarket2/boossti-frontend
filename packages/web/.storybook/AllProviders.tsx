import React from 'react';
import { store } from '@frontend/shared/redux';
import { guestClient } from '@frontend/shared/graphql';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client/react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/utils/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme({});

export const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    // @ts-ignore
    <Provider store={store}>
      <CacheProvider value={clientSideEmotionCache}>
        <ApolloProvider client={guestClient}>
          <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </ApolloProvider>
      </CacheProvider>
    </Provider>
  );
};
