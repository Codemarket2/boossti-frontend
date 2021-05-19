import React from 'react';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';

const StyledWraper = styled.View`
  flex: 1;
  justify-content: center;
`;

const StyledView = styled.View`
  margin-bottom: 20px;
`;

interface IProps {
  handleSelectRole: (role: string) => void;
}

export default function Step1({ handleSelectRole }: IProps) {
  return (
    <StyledWraper>
      <Button mode="contained" onPress={() => handleSelectRole('coach')}>
        Are you a coach?
      </Button>
      <StyledView />
      <Button mode="contained" onPress={() => handleSelectRole('client')}>
        Are you a client?
      </Button>
    </StyledWraper>
  );
}
