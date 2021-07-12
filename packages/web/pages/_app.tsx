import React, { useEffect } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import { AppProps } from 'next/app';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Amplify, { Hub } from 'aws-amplify';
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
import Head from 'next/head';

// CSS from node modules
import 'bootstrap/dist/css/bootstrap.min.css';

const customsSignInUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://www.vijaa.com/';
const customsSignOutUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/auth/'
    : 'https://www.vijaa.com/auth/';

Amplify.configure({
  ...aws_exports,
  ssr: true,
  oauth: {
    ...aws_exports.oauth,
    redirectSignIn: customsSignInUrl,
    redirectSignOut: customsSignOutUrl,
  },
});

const stripePromise = loadStripe(projectConfig.stripePublishableKey);

function App({ Component, pageProps }: AppProps) {
  const { getUser } = useCurrentAuthenticatedUser();
  const darkMode = useSelector(({ auth }: any) => auth.darkMode);

  const theme = createMuiTheme({
    palette: {
      ...palette,
      type: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser();
          break;
        case 'signOut':
        //   setUser(null);
        //   break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) jssStyles.parentNode.removeChild(jssStyles);
  }, []);

  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <StyledProvider theme={theme}>
          <Elements stripe={stripePromise}>
            <Head>
              <title>{projectConfig.title}</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
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
