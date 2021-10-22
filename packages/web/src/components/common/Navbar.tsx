import React, { useState } from 'react';
import styled from 'styled-components';
import DehazeIcon from '@material-ui/icons/Dehaze';

export const StyledMenuContainer = styled.div`
  border-top: 1px solid #bdbdbc;
  border-bottom: 1px solid #bdbdbc;
  padding: 13px 0;
`;

const Styled_ul = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  margin-bottom: 0;
  padding-left: 0px;
  text-align: center;
  ${(props) => props.theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

const Styled_li = styled.li`
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 400;
  color: #333;
`;
const Styled_span = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin: 0;
  text-transform: uppercase;
`;

const Styled_a = styled.a`
  font-size: 14px;
  margin: 0 15px;
  text-transform: uppercase;
  color: #000;
  transition: 0.3s all ease-in-out;
  text-decoration: none !important;
  :hover {
    color: #d3d3d3;
  }
`;

const Styled_icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div className="container">
      <div className="d-flex justify-content-center py-3">
        <img
          style={{ width: 150 }}
          alt="logo"
          src="https://katelesterinteriors.com/wp-content/uploads/2019/10/KL_interiors.svg"
        />
      </div>
      <StyledMenuContainer className="d-block d-lg-none">
        <Styled_icon onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <DehazeIcon />
          <Styled_span>Menu</Styled_span>
        </Styled_icon>
      </StyledMenuContainer>
      <StyledMenuContainer className={showMobileMenu ? 'd-block' : 'd-none d-lg-block'}>
        <Styled_ul>
          <Styled_li>
            <Styled_a href="#">HOME</Styled_a>
          </Styled_li>
          <Styled_li>
            <Styled_a href="#">ABOUT</Styled_a>
          </Styled_li>
          <Styled_li>
            <Styled_a href="#">PROCESS</Styled_a>
          </Styled_li>
          <Styled_li>
            <Styled_a href="#"> COMPLETED PROJECTS</Styled_a>
          </Styled_li>
          <Styled_li>
            <Styled_a href="#">CONTACT</Styled_a>
          </Styled_li>
          <Styled_li>
            <Styled_a href="#">BLOG</Styled_a>
          </Styled_li>
          <Styled_li>
            <Styled_a href="#">katelesterHOME</Styled_a>
          </Styled_li>
        </Styled_ul>
      </StyledMenuContainer>
    </div>
  );
}
