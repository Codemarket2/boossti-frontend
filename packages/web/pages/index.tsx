import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import { useRouter } from 'next/router';
import HomeScreen from '../src/screens/HomeScreen';
import InitialLoading from '../src/components/common/InitialLoading';

export default function Page() {
  const router = useRouter();
  const initial = useSelector(({ auth }: any) => auth.initial);

  const { error_description } = router.query;

  useEffect(() => {
    if (error_description) {
      if (error_description.includes('GOOGLE_ACCOUNT_LINKED')) {
        Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
      } else if (error_description.includes('FACEBOOK_ACCOUNT_LINKED')) {
        Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook });
      }
    }
  }, [error_description]);

  if ((error_description && error_description.includes('_ACCOUNT_LINKED')) || !initial) {
    return <InitialLoading />;
  }
  return <HomeScreen />;
}
