import React from 'react';
import { View } from 'react-native';
import { Caption } from 'react-native-paper';
import InputGroup from '../common/InputGroup';
import Button from '../common/Button';

export default function SignInForm() {
  return (
    <View>
      <Caption style={{ textAlign: 'center' }}>OR</Caption>
      <InputGroup>
        <Button
          style={{ backgroundColor: '#DB4437' }}
          contentStyle={{ paddingVertical: 10 }}
          disabled={false}
          mode="contained"
          icon="google">
          Sign in with Google
        </Button>
      </InputGroup>
      <InputGroup>
        <Button
          style={{ backgroundColor: '#4267B2' }}
          disabled={false}
          mode="contained"
          icon="facebook">
          Sign in with Facebook
        </Button>
      </InputGroup>
    </View>
  );
}
