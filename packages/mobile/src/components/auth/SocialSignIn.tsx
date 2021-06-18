import React from 'react';
import { View } from 'react-native';
import { Button, Caption } from 'react-native-paper';
import styled from 'styled-components/native';

const InputGroup = styled.View`
  margin: 8px 0px;
`;

export default function SignInForm() {
  return (
    <View>
      <Caption style={{ textAlign: 'center' }}>OR</Caption>
      <InputGroup>
        <Button
          style={{ paddingVertical: 8, backgroundColor: '#DB4437' }}
          disabled={false}
          mode="contained"
          icon="google">
          Sign in with Google
        </Button>
      </InputGroup>
      <InputGroup>
        <Button
          style={{ paddingVertical: 8, backgroundColor: '#4267B2' }}
          disabled={false}
          mode="contained"
          icon="facebook">
          Sign in with Facebook
        </Button>
      </InputGroup>
    </View>
  );
}
