import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { store } from '@frontend/shared/redux';
import { guestClient } from '@frontend/shared/graphql';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client/react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/utils/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme({});

const AllTheProviders: FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Provider store={store}>
      <CacheProvider value={clientSideEmotionCache}>
        <ApolloProvider client={guestClient}>
          <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </ApolloProvider>
      </CacheProvider>
    </Provider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
