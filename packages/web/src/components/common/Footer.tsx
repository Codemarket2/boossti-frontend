import React from 'react';
import styled from 'styled-components';
import FacebookIcon from '@material-ui/icons/Facebook';
import PinterestIcon from '@material-ui/icons/Pinterest';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Grid } from '@material-ui/core';

import { StyledMenuContainer } from './Navbar';

const StyledFooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;
const StyledRightContent = styled.div``;
const Styled_h3 = styled.h3`
  font-size: 15px;
  text-transform: capitalize;
  color: #000;
  text-shadow: 0 0;
`;
const StyledLeftContent = styled.div``;
const Styled_ul = styled.ul`
  list-style-type: none;
  display: flex;

  ${(props) => props.theme.breakpoints.down('sm')} {
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
  }
`;
const Styled_li = styled.li`
  margin-left: 7px;
  ${(props) => props.theme.breakpoints.down('sm')} {
    margin-right: 4px;
  }
`;
const Styled_img = styled.img`
  width: 14px;
`;
const Styled_a = styled.a`
  color: #000;
  :hover {
    color: #d3d3d3;
  }
`;
export default function Footer() {
  return (
    <StyledMenuContainer>
      <StyledFooterContainer>
        <StyledRightContent>
          <Styled_h3>follow us on:</Styled_h3>
        </StyledRightContent>
        <StyledLeftContent>
          <Styled_ul>
            <Styled_li>
              <Styled_a href="https://www.facebook.com/">
                <FacebookIcon />
              </Styled_a>
            </Styled_li>
            <Styled_li>
              <Styled_a href="https://www.instagram.com/">
                <InstagramIcon />
              </Styled_a>
            </Styled_li>
            <Styled_li>
              <Styled_a href="https://www.pinterest.com/">
                <PinterestIcon />
              </Styled_a>
            </Styled_li>
            <Styled_li>
              <Styled_a href="https://twitter.com/">
                <TwitterIcon />
              </Styled_a>
            </Styled_li>
            <Styled_li>
              <Styled_a href="#">
                <Styled_img src="https://katelesterinteriors.com/wp-content/uploads/2020/11/houzz-logo.png" />
              </Styled_a>
            </Styled_li>
          </Styled_ul>
        </StyledLeftContent>
      </StyledFooterContainer>
    </StyledMenuContainer>
  );
}
