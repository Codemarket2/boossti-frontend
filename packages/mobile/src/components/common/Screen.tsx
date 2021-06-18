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

export default function Screen({ children, safeArea = false, style = {} }: any) {
  if (safeArea) {
    return (
      <StyledSafeAreaView>
        <StyledView style={style}>{children}</StyledView>
      </StyledSafeAreaView>
    );
  }
  return <StyledView style={style}>{children}</StyledView>;
}
