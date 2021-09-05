import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Facebook from '@material-ui/icons/Facebook';
import Google from '@material-ui/icons/GTranslate';
import styled from 'styled-components';
import InputGroup from '../common/InputGroup';

const StyledCaptionWrapper = styled.div`
  border-top: 1px solid grey;
  justify-content: center;
  display: flex;
  margin-top: ${(props) => props.theme.spacing(3)}px;
`;

const StyledCaption = styled(Typography)`
  margin-top: -12px !important;
  background-color: ${(props) => props.theme.palette.background.level2};
  min-width: ${(props) => props.theme.spacing(4)}px;
  text-align: center;
`;

export default function SocialSignIn({ signIn = true }: { signIn?: boolean }) {
  const [disableSocial, setDisableSocial] = useState(true);

  useEffect(() => {
    console.log('window.location.hostname', window.location.host);
    console.log('window.location.hostname', window.location.hostname);
    if (window.location.hostname === 'localhost' || window.location.host.split('.')[0] === 'www') {
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
              alert('Go to www.vijaa.com to test social signin');
            } else {
              Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
            }
          }}>
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
              alert('Go to www.vijaa.com to test social signin');
            } else {
              Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook });
            }
          }}>
          Sign {signIn ? 'in' : 'up'} with Facebook
        </Button>
      </InputGroup>
    </div>
  );
}
