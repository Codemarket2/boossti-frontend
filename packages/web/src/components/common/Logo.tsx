import React from 'react';
import styled from 'styled-components';

const StyledLogoContainer = styled.div`
  width: 100%;
  float: left;
  margin: 20px 0;
  padding: 0;
  border: 0;
`;
const StyledLogoWrapper = styled.div`
  width: 100%;
  float: left;
  text-align: center;
  margin: 0;
  padding: 0;
  border: 0;
`;
const StyledLogo_a = styled.a`
  color: #222;
`;
const StyledLogo_img = styled.img`
  width: 170px;
`;
export default function Logo() {
  return (
    <StyledLogoContainer>
      <StyledLogoWrapper>
        <StyledLogo_a href="#">
          <StyledLogo_img src="https://katelesterinteriors.com/wp-content/uploads/2019/10/KL_interiors.svg" />
        </StyledLogo_a>
      </StyledLogoWrapper>
    </StyledLogoContainer>
  );
}
