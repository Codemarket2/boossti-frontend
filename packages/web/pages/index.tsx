import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import { useRouter } from 'next/router';
import { RootState } from '@frontend/shared/redux';
import InitialLoading from '../src/components/common/InitialLoading';
import HomeScreen from '../src/screens/HomeScreen-new';
import AppDashboard from '../src/components/app/AppDashboard';
import AppWrapper from '../src/components/app/AppWrapper';

export default function Page() {
  const router = useRouter();
  const globalState = useSelector((state: RootState) => state);
  const { initial } = globalState.auth;
  const { isApp } = globalState.setting;
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
    return (
      <AppWrapper>
        <AppDashboard />
      </AppWrapper>
    );
  }
  // If user is authenticated and at home page the push to feed page
  // if (globalState.auth.authenticated) {
  //   router.push('/feed');
  // }

  return <HomeScreen />;
}
