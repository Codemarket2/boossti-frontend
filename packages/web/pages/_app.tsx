import { useEffect } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import { AppProps } from 'next/app';
import Amplify, { Hub } from 'aws-amplify';
import { Provider, useSelector } from 'react-redux';
import { ApolloProvider } from '@apollo/client/react';
import { client, guestClient } from '@frontend/shared/graphql';
import awsExports from '@frontend/shared/aws-exports';
import { store } from '@frontend/shared/redux';
import { useLogoHook } from '@frontend/shared';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useCurrentAuthenticatedUser } from '@frontend/shared/hooks/auth';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import LoadingBar from '../src/components/common/LoadingBar';
import Head from '../src/components/common/Head';
import { light, dark } from '../src/utils/theme/palette';

// // CSS from node modules
import 'bootstrap/dist/css/bootstrap.min.css';

import '../src/assets/css/ckeditor.css';
import '../src/assets/css/common.css';

const customsSignInUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://www.boossti.com/';
const customsSignOutUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/auth/'
    : 'https://www.boossti.com/auth/';

Amplify.configure({
  ...awsExports,
  ssr: true,
  oauth: {
    ...awsExports.oauth,
    redirectSignIn: customsSignInUrl,
    redirectSignOut: customsSignOutUrl,
  },
});

function App({ Component, pageProps }: AppProps) {
  const { getUser } = useCurrentAuthenticatedUser();
  const { darkMode, authenticated } = useSelector(({ auth }: any) => auth);

  useLogoHook();
  const theme = createMuiTheme({
    palette: darkMode ? dark : light,
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
  });

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    Hub.listen('auth', ({ payload: { event } }) => {
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
        default:
          return null;
      }
    });
  }, []);

  return (
    <ApolloProvider client={authenticated ? client : guestClient}>
      <MuiThemeProvider theme={theme}>
        <StyledProvider theme={theme}>
          <Head />
          <LoadingBar />
          <CssBaseline />
          <Component {...pageProps} />
        </StyledProvider>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

export default function NewApp(props) {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
}
