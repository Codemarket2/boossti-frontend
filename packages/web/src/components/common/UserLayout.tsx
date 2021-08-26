import { ReactNode } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import projectConfig from '@frontend/shared';
import AuthRequired from './AuthRequired';
import AppBar from './AppBar';
import BottomBar from './BottomBar';
import Container from './Container';
import Paper from '@material-ui/core/Paper';

import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  background-color: ${(props) => props.theme.palette.background.level2} !important;
  min-height: 100vh !important;
`;

interface IProps {
  title?: string;
  children: ReactNode;
  authRequired?: boolean;
  mustAdmin?: boolean;
  redirectPath?: string;
}

const UserLayout = ({
  children,
  title = projectConfig.title,
  authRequired = false,
  mustAdmin = false,
  redirectPath,
}: IProps) => {
  const authenticated = useSelector(({ auth }: any) => auth.authenticated);
  return (
    <StyledPaper elevation={0}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
      <Container>
        {authRequired ? (
          <AuthRequired redirectPath={redirectPath} mustAdmin={mustAdmin}>
            {children}
          </AuthRequired>
        ) : (
          children
        )}
      </Container>
      {authenticated && <BottomBar />}
    </StyledPaper>
  );
};

export default UserLayout;
