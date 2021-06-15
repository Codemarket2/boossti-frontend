import React from 'react';
import { Auth } from 'aws-amplify';
import { Button } from '@material-ui/core';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';

export default function SocialSignIn() {
  return (
    <div className="mt-5">
      <Button
        fullWidth
        disabled
        type="button"
        variant="contained"
        color="secondary"
        className="my-2"
        size="large"
        onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}>
        Sign in with Google
      </Button>
      <br />
      <Button
        fullWidth
        disabled
        type="button"
        variant="contained"
        color="secondary"
        className="my-2"
        size="large"
        onClick={() =>
          Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })
        }>
        Sign in with Facebook
      </Button>
    </div>
  );
}
