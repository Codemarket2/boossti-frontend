import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import { useRouter } from 'next/router';
import InitialLoading from '../src/components/common/InitialLoading';
import Layout2, { Section } from '../src/components/common/Layout2';

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
    <Layout2>
      <Section slug="home" />
    </Layout2>
  );
}
