import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import AuthRequired from './AuthRequired';
import AppBar from './AppBar';
// import BottomBar from './BottomBar';
import Container from './Container';
import NotFound from './NotFound';
import FeedLayout from '../form2/feed/FeedLayout';

const StyledPaper = styled(Paper)(() => ({
  backgroundColor: `#F0F2F5 !important`,
  minHeight: '100vh !important',
}));

interface IProps {
  children: ReactNode;
  authRequired?: boolean;
  mustAdmin?: boolean;
  container?: boolean;
  feedLayout?: boolean;
}

const UserLayout = ({
  children,
  authRequired = false,
  mustAdmin = false,
  container = true,
  feedLayout,
}: IProps): any => {
  const { setting } = useSelector((state: any) => state);
  // const { authenticated } = auth;

  if (setting?.isApp) {
    return <NotFound />;
  }

  const ChildComponent = feedLayout ? <FeedLayout>{children}</FeedLayout> : children;

  return (
    <StyledPaper elevation={0}>
      <AppBar />
      <Container maxWidth={container ? 'lg' : false}>
        {authRequired ? (
          <AuthRequired mustAdmin={mustAdmin}>{ChildComponent}</AuthRequired>
        ) : (
          ChildComponent
        )}
      </Container>
      {/* {authenticated && <BottomBar />} */}
    </StyledPaper>
  );
};

export default UserLayout;
