import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import { useRouter } from 'next/router';
import { RootState } from '@frontend/shared/redux';
import InitialLoading from '../src/components/common/InitialLoading';
// import UserLayout from '../src/components/common/UserLayout';
import HomeScreen from '../src/screens/HomeScreen-new';
import AppDashboard from '../src/components/app/AppDashboard';

export default function Page() {
  const router = useRouter();
  const globalState = useSelector((state: RootState) => state);
  const { initial } = globalState.auth;
  const { isApp } = globalState.setting;
  // const initial = useSelector(({ auth }: RootState) => auth.initial);
  const { error_description: errorDescription } = router.query;

  useEffect(() => {
    if (errorDescription) {
      if (errorDescription.includes('GOOGLE_ACCOUNT_LINKED')) {
        Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
      } else if (errorDescription.includes('FACEBOOK_ACCOUNT_LINKED')) {
        Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook });
      }
    }
  }, [errorDescription]);

  if ((errorDescription && errorDescription.includes('_ACCOUNT_LINKED')) || !initial) {
    return <InitialLoading />;
  }

  if (isApp) {
    return <AppDashboard />;
  }
  return <HomeScreen />;
}
