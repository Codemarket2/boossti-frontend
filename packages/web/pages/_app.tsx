import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppProps } from 'next/app';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import { store } from '@frontend/shared/redux';
import { ApolloProvider } from '@apollo/client/react';
import { client } from '@frontend/shared/graphql';
import aws_exports from '@frontend/shared/aws-exports';
import { useCurrentAuthenticatedUser } from '@frontend/shared/hooks/auth';
import palette, { mainPalette } from '@frontend/shared/config/colors';
import projectConfig from '@frontend/shared';
import { createMuiTheme, ThemeProvider as MUThemeProvider } from '@material-ui/core/styles';
import LoadingBar from '../src/components/common/LoadingBar';

// CSS from node modules
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
// Global CSS
// import '../src/styles/styles.css';

Amplify.configure({
  ...aws_exports,
  ssr: true,
  oauth: {
    ...aws_exports.oauth,
    redirectSignIn: true ? 'https://d3fmot6d29rs7w.cloudfront.net/' : 'http://localhost:3000/',
    redirectSignOut: true ? 'https://d3fmot6d29rs7w.cloudfront.net/' : 'http://localhost:3000/',
  },
});

const stripePromise = loadStripe(projectConfig.stripePublishableKey);

const theme = createMuiTheme({
  palette: {
    ...palette,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <MUThemeProvider theme={theme}>
          <ThemeProvider theme={{ colors: mainPalette }}>
            <Elements stripe={stripePromise}>
              <LoadingBar />
              <InitialData />
              <Component {...pageProps} />
            </Elements>
          </ThemeProvider>
        </MUThemeProvider>
      </ApolloProvider>
    </Provider>
  );
}

// InitialData - This Component is created because the useCurrentAuthenticatedUser hook need to be call inside redux provider
const InitialData = () => {
  useCurrentAuthenticatedUser();
  return null;
};
