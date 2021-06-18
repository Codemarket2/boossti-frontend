import React from 'react';
import { Headline, Subheading } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';
import SignUpForm from '../../components/auth/SignUpForm';
import Screen from '../../components/common/Screen';

export default function SignInScreen({ navigation }: any) {
  return (
    <Screen safeArea style={{ justifyContent: 'space-between' }}>
      <SignUpForm />
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
          <Subheading style={{ textAlign: 'center', marginTop: 10 }}>
            Already have an account? Sign In
          </Subheading>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
