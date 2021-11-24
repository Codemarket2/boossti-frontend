import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import AuthRequired from './AuthRequired';
import AppBar from './AppBar';
import BottomBar from './BottomBar';
import Container, { DivContainer } from './Container';

const StyledPaper = styled(Paper)`
  background-color: ${(props) => props.theme.palette.background.level2} !important;
  min-height: 100vh !important;
`;

interface IProps {
  children: ReactNode;
  authRequired?: boolean;
  mustAdmin?: boolean;
  redirectPath?: string;
  container?: boolean;
}

const UserLayout = ({
  children,
  authRequired = false,
  mustAdmin = false,
  redirectPath,
  container = true,
}: IProps): any => {
  const authenticated = useSelector(({ auth }: any) => auth.authenticated);
  return (
    <StyledPaper elevation={0}>
      <AppBar />
      {container ? (
        <Container>
          {authRequired ? (
            <AuthRequired redirectPath={redirectPath} mustAdmin={mustAdmin}>
              {children}
            </AuthRequired>
          ) : (
            children
          )}
        </Container>
      ) : (
        <DivContainer>
          {authRequired ? (
            <AuthRequired redirectPath={redirectPath} mustAdmin={mustAdmin}>
              {children}
            </AuthRequired>
          ) : (
            children
          )}
        </DivContainer>
      )}
      {authenticated && <BottomBar />}
    </StyledPaper>
  );
};

export default UserLayout;
