import React, { useEffect } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import { AppProps } from 'next/app';
import Amplify, { Hub } from 'aws-amplify';
import { useSelector } from 'react-redux';
import { wrapper } from '../src/utils/store';
import { ApolloProvider } from '@apollo/client/react';
import { client } from '@frontend/shared/graphql';
import aws_exports from '@frontend/shared/aws-exports';
import { useCurrentAuthenticatedUser } from '@frontend/shared/hooks/auth';
// import palette from '@frontend/shared/config/colors';
import projectConfig from '@frontend/shared';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoadingBar from '../src/components/common/LoadingBar';
import Head from 'next/head';
import { light, dark } from '../src/components/home/theme/palette';

// // CSS from node modules
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'aos/dist/aos.css';
// import 'react-lazy-load-image-component/src/effects/opacity.css';
// import 'leaflet/dist/leaflet.css';
// import 'swiper/css/swiper.min.css';
// import 'semantic-ui-css/semantic.min.css';

import '../src/assets/css/ckeditor.css';

import '../src/components/contentbuilder/contentbuilder.css';
// import '../src/components/contentbuilder/assets/minimalist-blocks/content.css';
// import '../src/components/contentbuilder/assets/ionicons/css/ionicons.min.css';

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

function App({ Component, pageProps }: AppProps) {
  const { getUser } = useCurrentAuthenticatedUser();
  const darkMode = useSelector(({ auth }: any) => auth.darkMode);

  const theme = createMuiTheme({
    palette: darkMode ? dark : light,
    layout: {
      contentWidth: 1236,
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    zIndex: {
      appBar: 1200,
      drawer: 1100,
    },
    // palette: {
    //   ...palette,
    //   type: darkMode ? 'dark' : 'light',
    // },
  });

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser();
          break;
        case 'signOut':
          //   setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          // console.log('Sign in failure', data);
          break;
      }
    });
  }, []);

  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <StyledProvider theme={theme}>
          <Head>
            <title>{projectConfig.title}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <LoadingBar />
          <CssBaseline />
          <Component {...pageProps} />
        </StyledProvider>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

export default wrapper.withRedux(App);
