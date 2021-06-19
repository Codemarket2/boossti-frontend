import React from 'react';
import { Subheading } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';
import SignUpForm from '../../components/auth/SignUpForm';
import Screen from '../../components/common/Screen';
import styled from 'styled-components/native';

const StyledScreen = styled(Screen)`
  justify-content: space-between;
`;

const StyledSubheading = styled(Subheading)`
  text-align: center;
  margin-top: 10px;
`;

export default function SignUpScreen({ navigation }: any) {
  return (
    <StyledScreen safeArea>
      <SignUpForm />
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
          <StyledSubheading>Already have an account? Sign In</StyledSubheading>
        </TouchableOpacity>
      </View>
    </StyledScreen>
  );
}
