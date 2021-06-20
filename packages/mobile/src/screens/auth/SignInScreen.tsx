import React from 'react';
import SignInForm from '../../components/auth/SignInForm';
import Screen from '../../components/common/Screen';
import styled from 'styled-components/native';

const StyledScreen = styled(Screen)`
  justify-content: space-between;
`;

export default function SignInScreen({ navigation }: any) {
  return (
    <StyledScreen safeArea>
      <SignInForm handleForgetPassword={() => navigation.navigate('ForgetPasswordScreen')} />
    </StyledScreen>
  );
}
