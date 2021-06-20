import React from 'react';
import SignUpForm from '../../components/auth/SignUpForm';
import Screen from '../../components/common/Screen';
import styled from 'styled-components/native';

const StyledScreen = styled(Screen)`
  justify-content: space-between;
`;

export default function SignUpScreen({ navigation }: any) {
  return (
    <StyledScreen safeArea>
      <SignUpForm />
    </StyledScreen>
  );
}
