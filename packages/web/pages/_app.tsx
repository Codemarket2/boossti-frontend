import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';
// import { ThemeProvider as StyledProvider } from 'styled-components';
import { AppProps } from 'next/app';
import Amplify, { Hub } from 'aws-amplify';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ApolloProvider } from '@apollo/client/react';
import { client, guestClient } from '@frontend/shared/graphql';
import { setDefaultThemeAction } from '@frontend/shared/redux/actions/setting';
import awsExports from '@frontend/shared/aws-exports';
import { store } from '@frontend/shared/redux';
// import { useInitializeSystem } from '@frontend/shared/hooks/form';
// import { useLogoHook } from '@frontend/shared/hooks/metaTags';
import CssBaseline from '@mui/material/CssBaseline';
import { useCurrentAuthenticatedUser } from '@frontend/shared/hooks/auth';
import { useGetUserForm } from '@frontend/shared/hooks/user/getUserForm';
import { useGetApp } from '@frontend/shared/hooks/app';
import { createTheme, ThemeProvider as MuiThemeProvider, adaptV4Theme } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';
import GlobalStyles from '@mui/material/GlobalStyles';
import TagManager from 'react-gtm-module';
import LoadingBar from '../src/components/common/LoadingBar';
import Head from '../src/components/common/Head';
// import { useOneSignal } from '../src/components/notification/onesignal';
import { setDefaultTheme } from '../src/components/customMUI/commonFunc';
import createEmotionCache from '../src/utils/createEmotionCache';
// import { light, dark } from '../src/utils/theme/palette';
// import { typography } from '../src/utils/theme/typography';
// import GlobalStyle from '../src/utils/GlobalStyle';

// // CSS from node modules
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactflow/dist/style.css';

import '../src/assets/css/ckeditor.css';
import '../src/assets/css/common.css';
import '../src/components/react-flow/styles.css';
import '../src/components/syncfusion-diagram/styles.css';
import '../src/components/grapesjs/style.css';
import LoadingOverlay from '../src/components/common/LoadingOverlay';
import UpdateFeedStatus from '../src/components/form2/feed/UpdateFeedStatus';

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

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  const { getUser } = useCurrentAuthenticatedUser();
  const { authenticated } = useSelector(({ auth }: any) => auth);
  const settings = useSelector(({ setting }: any) => setting);
  const dispatch = useDispatch();
  const router = useRouter();
  // useInitializeSystem();
  // useOneSignal();
  // useLogoHook();
  const { loading } = useGetApp();

  const theme = createTheme(adaptV4Theme(settings.theme));

  useEffect(() => {
    setDefaultTheme().then((res: any) => dispatch(setDefaultThemeAction(res)));
    // const jssStyles = document.querySelector('#jss-server-side');
    // if (jssStyles && jssStyles.parentNode) {
    //   jssStyles.parentNode.removeChild(jssStyles);
    // }

    const tagManagerArgs = {
      gtmId: 'G-38LJY06F3Z',
    };

    TagManager.initialize(tagManagerArgs);

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
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={authenticated ? client : guestClient}>
        <MuiThemeProvider theme={theme}>
          <Head />
          <LoadingBar />
          <LoadUserForm />
          <CssBaseline />
          <GlobalStyles
            styles={{
              button: {
                outline: 'none !important',
              },
              '.ck-balloon-panel_caret_se': {
                zIndex: '99991 !important',
              },
            }}
          />
          {loading && <LoadingOverlay />}
          {authenticated && router?.query?.feedId && (
            <UpdateFeedStatus feedId={router?.query?.feedId?.toString()} />
          )}
          <Component {...pageProps} />
        </MuiThemeProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}

export default function NewApp(props) {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
}

function LoadUserForm() {
  useGetUserForm();
  return null;
}
