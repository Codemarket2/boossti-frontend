import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import projectConfig from '@frontend/shared';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from './Drawer';
import { useDarkMode } from './DarkModeToggle';
import LogoutButton from './LogoutButton';
import FeedWrapper from '../form2/feed/FeedWrapper';

const StyledTitle = styled(Typography)(({ theme }) => ({
  width: '100%',
  cursor: 'pointer',
  fontWeight: 'bold !important',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center !important',
  },
}));

const StyledImageContainer = styled('div')(({ theme }) => ({
  width: '100%',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center !important',
  },
}));

const MenuWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    display: 'none !important',
  },
}));

export default function AppBarComponent() {
  const { authenticated, admin } = useSelector(({ auth }: any) => auth);
  const { setting } = useSelector((state: any) => state);

  const [showDrawer, setShowDrawer] = useState(false);

  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState<string>('/');
  useDarkMode();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (activeRoute !== router.pathname) {
      setActiveRoute(router.pathname);
    }
  }, []);

  return (
    <AppBar elevation={1} position={matches ? 'sticky' : 'static'} color="primary">
      <Toolbar>
        {authenticated ? (
          <>
            <Tooltip title="Menu">
              <IconButton onClick={() => setShowDrawer(true)} color="inherit" size="large">
                <MenuIcon role="button" className="mr-0" />
              </IconButton>
            </Tooltip>
            <Drawer toggleDrawer={setShowDrawer} showDrawer={showDrawer} admin={admin} />
          </>
        ) : null}
        <Link href="/">
          {setting.metaTags.image ? (
            <StyledImageContainer>
              <img
                style={{ maxHeight: 60 }}
                src={setting.metaTags.image}
                alt={setting.metaTags.title}
              />
            </StyledImageContainer>
          ) : (
            <StyledTitle variant="h5" color="textPrimary">
              {setting.metaTags.title || projectConfig.title}
            </StyledTitle>
          )}
        </Link>
        {authenticated ? (
          <>
            {/* <Notification /> */}
            {/* <MenuWrapper>
              <Tooltip title="Home">
                <IconButton
                  onClick={() => router.push(routes.feeds)}
                  color={setActiveRouteColor(activeRoute, routes.feeds)}
                >
                  <HomeIcon />
                </IconButton>
              </Tooltip>
            </MenuWrapper> */}
            <FeedWrapper />
            <LogoutButton />
          </>
        ) : (
          <Link href="/auth">
            <Button color="inherit">SignIn</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}
