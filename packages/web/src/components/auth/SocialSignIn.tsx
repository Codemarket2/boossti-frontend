import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Facebook from '@mui/icons-material/Facebook';
import Google from '@mui/icons-material/GTranslate';
import { styled } from '@mui/material/styles';
import InputGroup from '../common/InputGroup';

const StyledCaptionWrapper = styled('div')(({ theme }) => ({
  borderTop: '1px solid grey',
  justifyContent: 'center',
  display: 'flex',
  marginTop: theme.spacing(3),
}));

const StyledCaption = styled(Typography)(({ theme }) => ({
  marginTop: '-12px !important',
  backgroundColor: theme.palette.background.default,
  minWidth: theme.spacing(4),
  textAlign: 'center',
}));

export default function SocialSignIn({ signIn = true }: { signIn?: boolean }) {
  const [disableSocial, setDisableSocial] = useState(true);

  useEffect(() => {
    if (
      window.location.origin === 'http://localhost:3000' ||
      window.location.origin === 'https://www.boossti.com'
    ) {
      setDisableSocial(false);
    }
  }, []);

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
          style={{ backgroundColor: '#DB4437', color: 'white' }}
          type="button"
          variant="contained"
          onClick={() => {
            if (disableSocial) {
              alert('Social signin is disabled for this URL');
            } else {
              Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
            }
          }}
        >
          Sign {signIn ? 'in' : 'up'} with Google
        </Button>
      </InputGroup>
      <InputGroup>
        <Button
          startIcon={<Facebook />}
          data-testid="facebook-signin-button"
          fullWidth
          style={{ backgroundColor: '#4267B2', color: 'white' }}
          type="button"
          variant="contained"
          onClick={() => {
            if (disableSocial) {
              alert('Social signin is disabled for this URL');
            } else {
              Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook });
            }
          }}
        >
          Sign {signIn ? 'in' : 'up'} with Facebook
        </Button>
      </InputGroup>
    </div>
  );
}
