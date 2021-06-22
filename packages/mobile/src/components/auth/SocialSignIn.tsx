import React from 'react';
import { View } from 'react-native';
import { Caption } from 'react-native-paper';
import styled from 'styled-components/native';
import InputGroup from '../common/InputGroup';
import Button from '../common/Button';

const StyledCaptionWrapper = styled.View`
  border-top-width: 1px;
  border-top-color: grey;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const StyledCaption = styled(Caption)`
  text-align: center;
  background-color: ${(props) => props.theme.colors.surface};
  min-width: 30px;
  margin-top: -10px;
`;

export default function SignInForm({ signIn = true }: { signIn?: boolean }) {
  return (
    <View>
      <StyledCaptionWrapper>
        <StyledCaption>OR</StyledCaption>
      </StyledCaptionWrapper>
      <InputGroup>
        <Button
          style={{ backgroundColor: '#DB4437' }}
          disabled={false}
          mode="contained"
          icon="google">
          Sign {signIn ? 'in' : 'up'} with Google
        </Button>
      </InputGroup>
      <InputGroup>
        <Button
          style={{ backgroundColor: '#4267B2' }}
          disabled={false}
          mode="contained"
          icon="facebook">
          Sign {signIn ? 'in' : 'up'} with Facebook
        </Button>
      </InputGroup>
    </View>
  );
}
