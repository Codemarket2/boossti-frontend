import React from 'react';
import { Auth } from 'aws-amplify';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Facebook from '@material-ui/icons/Facebook';
import Google from '@material-ui/icons/GTranslate';
import styled from 'styled-components';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import InputGroup from '../common/InputGroup';

const StyledCaptionWrapper = styled.div`
  border-top: 1px solid grey;
  justify-content: center;
  display: flex;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const StyledCaption = styled(Typography)`
  margin-top: -12px;
  background-color: white;
  min-width: 40px;
  text-align: center;
`;

export default function SocialSignIn({ signIn = true }: { signIn?: boolean }) {
  return (
    <div>
      <StyledCaptionWrapper>
        <StyledCaption>OR</StyledCaption>
      </StyledCaptionWrapper>
      <InputGroup>
        <Button
          startIcon={<Google />}
          data-testid="google-signin-button"
          fullWidth
          style={{ backgroundColor: '#DB4437', color: 'white', pointerEvents: 'none' }}
          type="button"
          variant="contained"
          onClick={() =>
            Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })
          }>
          Sign {signIn ? 'in' : 'up'} with Google
        </Button>
      </InputGroup>
      <InputGroup>
        <Button
          startIcon={<Facebook />}
          data-testid="facebook-signin-button"
          fullWidth
          style={{ backgroundColor: '#4267B2', color: 'white', pointerEvents: 'none' }}
          type="button"
          variant="contained"
          onClick={() =>
            Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })
          }>
          {/* <Facebook className="mr-2" />  */}
          Sign {signIn ? 'in' : 'up'} with Facebook
        </Button>
      </InputGroup>
    </div>
  );
}
