import React from 'react';
import { Subheading } from 'react-native-paper';
import { View, TouchableOpacity, Platform } from 'react-native';
import SignInForm from '../../components/auth/SignInForm';
import Screen from '../../components/common/Screen';
import styled from 'styled-components/native';

const StyledScreen = styled(Screen)`
  justify-content: space-between;
`;

const StyledSubheading = styled(Subheading)`
  text-align: center;
  margin-top: 10px;
`;

export default function SignInScreen({ navigation }: any) {
  return (
    <StyledScreen safeArea>
      <SignInForm handleForgetPassword={() => navigation.navigate('ForgetPasswordScreen')} />
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <StyledSubheading>Don't have and account? Sign Up</StyledSubheading>
        </TouchableOpacity>
      </View>
    </StyledScreen>
  );
}
