import React from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;
const StyledText = styled.Text`
  font-size: 18px;
  color: blue;
  font-weight: 500;
`;

export default function Explore() {
  return (
    <Container>
      <StyledText>Open up App.js to start working on your app!</StyledText>
    </Container>
  );
}
