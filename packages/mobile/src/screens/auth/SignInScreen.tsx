import React from 'react';
import { Headline } from 'react-native-paper';
import SignIn from '../../components/auth/SignIn';
import Screen from '../../components/common/Screen';

export default function SignInScreen() {
  return (
    <Screen safeArea>
      <Headline style={{ textAlign: 'center' }}>Sign In</Headline>
      <SignIn />
    </Screen>
  );
}
