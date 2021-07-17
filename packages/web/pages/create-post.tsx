// import React, { useEffect } from 'react';
// import { Auth } from 'aws-amplify';
// import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import { useRouter } from 'next/router';
import UserLayout from '../src/components/common/UserLayout';
import Typography from '@material-ui/core/Typography';
// import InitialLoading from '../src/components/common/InitialLoading';
import CreatePostScreen from '../src/screens/CreatePostScreen';

export default function Page() {
  const router = useRouter();

  // const { error_description } = router.query;

  // useEffect(() => {
  //   if (error_description) {
  //     if (error_description.includes('GOOGLE_ACCOUNT_LINKED')) {
  //       Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
  //     } else if (error_description.includes('FACEBOOK_ACCOUNT_LINKED')) {
  //       Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook });
  //     }
  //   }
  // }, [error_description]);

  // if (error_description && error_description.includes('_ACCOUNT_LINKED')) {
  //   return <InitialLoading />;
  // }

  return (
    <UserLayout authRequired>
      <Typography variant="h4">Create Post</Typography>
      <CreatePostScreen />
    </UserLayout>
  );
}
