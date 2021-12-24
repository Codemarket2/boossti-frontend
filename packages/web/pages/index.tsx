import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import { useRouter } from 'next/router';
import InitialLoading from '../src/components/common/InitialLoading';
import UserLayout from '../src/components/common/UserLayout';
import HomeScreen from '../src/screens/HomeScreen';

export default function Page() {
  const router = useRouter();
  const initial = useSelector(({ auth }: any) => auth.initial);

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

  return (
    <UserLayout container={false}>
      <HomeScreen />
    </UserLayout>
  );
}
