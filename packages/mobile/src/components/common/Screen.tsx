import React from 'react';
import styled from 'styled-components/native';

const StyledView = styled.View`
  padding: 10px;
  flex: 1;
  background-color: white;
`;

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

export default function Screen({ children, safeArea = false }) {
  if (safeArea) {
    return (
      <StyledSafeAreaView>
        <StyledView>{children}</StyledView>
      </StyledSafeAreaView>
    );
  }
  return <StyledView>{children}</StyledView>;
}
