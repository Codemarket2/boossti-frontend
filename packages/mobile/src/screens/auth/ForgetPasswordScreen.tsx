import React from 'react';
import { Subheading } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';
import ForgetPasswordForm from '../../components/auth/ForgetPasswordForm';
import Screen from '../../components/common/Screen';
import styled from 'styled-components/native';

const StyledScreen = styled(Screen)`
  justify-content: space-between;
`;

const StyledSubheading = styled(Subheading)`
  text-align: center;
  margin-top: 10px;
`;

export default function ForgetPasswordScreen({ navigation }: any) {
  return (
    <StyledScreen safeArea>
      <ForgetPasswordForm />
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <StyledSubheading>Don't have and account? Sign Up</StyledSubheading>
        </TouchableOpacity>
      </View>
    </StyledScreen>
  );
}
