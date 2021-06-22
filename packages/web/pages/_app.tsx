import React from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import { AppProps } from 'next/app';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Amplify from 'aws-amplify';
import { useSelector } from 'react-redux';
import { wrapper } from '../src/store';
import { ApolloProvider } from '@apollo/client/react';
import { client } from '@frontend/shared/graphql';
import aws_exports from '@frontend/shared/aws-exports';
import { useCurrentAuthenticatedUser } from '@frontend/shared/hooks/auth';
import palette from '@frontend/shared/config/colors';
import projectConfig from '@frontend/shared';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoadingBar from '../src/components/common/LoadingBar';

// CSS from node modules
import 'bootstrap/dist/css/bootstrap.min.css';
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

function App({ Component, pageProps }: AppProps) {
  useCurrentAuthenticatedUser();
  const darkMode = useSelector(({ auth }: any) => auth.darkMode);

  const theme = createMuiTheme({
    palette: {
      ...palette,
      type: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <StyledProvider theme={theme}>
          <Elements stripe={stripePromise}>
            <LoadingBar />
            <CssBaseline />
            <Component {...pageProps} />
          </Elements>
        </StyledProvider>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

export default wrapper.withRedux(App);
