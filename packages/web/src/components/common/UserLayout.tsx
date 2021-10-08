import { ReactNode } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import projectConfig from '@frontend/shared';
import AuthRequired from './AuthRequired';
import AppBar from './AppBar';
import BottomBar from './BottomBar';
import Container from './Container';
import { DivContainer } from './Container';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  background-color: ${(props) => props.theme.palette.background.level2} !important;
  min-height: 100vh !important;
`;

interface IProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  children: ReactNode;
  authRequired?: boolean;
  mustAdmin?: boolean;
  redirectPath?: string;
  container?: boolean;
}

const UserLayout = ({
  children,
  title = projectConfig.title,
  description = projectConfig.description,
  image = projectConfig.image,
  url = projectConfig.url,
  authRequired = false,
  mustAdmin = false,
  redirectPath,
  container = true,
}: IProps) => {
  const authenticated = useSelector(({ auth }: any) => auth.authenticated);
  return (
    <StyledPaper elevation={0}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content={title} />
        <meta name="twitter:image:alt" content={title} />
      </Head>
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
