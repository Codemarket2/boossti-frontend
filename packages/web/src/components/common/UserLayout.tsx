import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import AuthRequired from './AuthRequired';
import AppBar from './AppBar';
import BottomBar from './BottomBar';
import Container from './Container';
import NotFound from './NotFound';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: `#F0F2F5 !important`,
  minHeight: '100vh !important',
}));

interface IProps {
  children: ReactNode;
  authRequired?: boolean;
  mustAdmin?: boolean;
  container?: boolean;
}

const UserLayout = ({
  children,
  authRequired = false,
  mustAdmin = false,
  container = true,
}: IProps): any => {
  const { auth, setting } = useSelector((state: any) => state);
  const { authenticated } = auth;
  // const authenticated = useSelector(({ auth }: any) => auth.authenticated);
  if (setting?.isApp) {
    return <NotFound />;
  }
  return (
    <StyledPaper elevation={0}>
      <AppBar />
      <Container maxWidth={container ? 'lg' : false}>
        {authRequired ? <AuthRequired mustAdmin={mustAdmin}>{children}</AuthRequired> : children}
      </Container>
      {authenticated && <BottomBar />}
    </StyledPaper>
  );
};

export default UserLayout;
