import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import projectConfig from '@frontend/shared';
import { useHandleLogout } from '@frontend/shared/hooks/auth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import ChatBubble from '@material-ui/icons/ChatBubble';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Event from '@material-ui/icons/Event';
import Videocam from '@material-ui/icons/Videocam';
import HomeIcon from '@material-ui/icons/Home';
import Group from '@material-ui/icons/Group';
import Tooltip from '@material-ui/core/Tooltip';
import Drawer from './Drawer';
import styled from 'styled-components';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { routes } from '../../utils/routes';

const setActiveRouteColor = (activeRoute, linkRoute) => {
  return activeRoute === linkRoute ? 'primary' : 'default';
};

const StyledTitle = styled(Typography)`
  width: 100%;
  cursor: pointer;
  ${(props) => props.theme.breakpoints.down('xs')} {
    text-align: center !important;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  ${(props) => props.theme.breakpoints.down('xs')} {
    display: none !important;
  }
`;

export default function AppBarComponent() {
  const { authenticated, darkMode, admin } = useSelector(({ auth }: any) => auth);
  const { handleLogout } = useHandleLogout();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState<String>('/');
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (activeRoute !== router.pathname) {
      setActiveRoute(router.pathname);
      ``;
    }
  }, []);

  return (
    <AppBar
      elevation={1}
      position={matches ? 'sticky' : 'static'}
      // color={darkMode ? 'default' : 'primary'}
      color="inherit">
      <Toolbar>
        {authenticated ? (
          <>
            <Tooltip title="Menu">
              <IconButton onClick={() => setOpenDrawer(true)} color="inherit">
                <MenuIcon role="button" className="mr-0" />
              </IconButton>
            </Tooltip>
            <Drawer
              setOpenDrawer={setOpenDrawer}
              openDrawer={openDrawer}
              darkMode={darkMode}
              admin={admin}
            />
          </>
        ) : null}
        <Link href="/">
          {/* <StyledTitle variant="h6">{projectConfig.title}</StyledTitle> */}
          <Typography variant="h5" className="font-weight-bold w-100" color="textPrimary">
            {projectConfig.title}
          </Typography>
        </Link>
        {authenticated ? (
          <>
            <MenuWrapper>
              <Tooltip title="Home">
                <IconButton
                  onClick={() => router.push(routes.home)}
                  color={setActiveRouteColor(activeRoute, routes.home)}>
                  <HomeIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Inbox">
                <IconButton
                  onClick={() => router.push(routes.inbox)}
                  color={setActiveRouteColor(activeRoute, routes.inbox)}>
                  <ChatBubble />
                </IconButton>
              </Tooltip>
              <Tooltip title="Offerings">
                <IconButton color={setActiveRouteColor(activeRoute, routes.offerings)}>
                  <Event onClick={() => router.push(routes.offerings)} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Sessions">
                <IconButton
                  onClick={() => router.push(routes.sessions)}
                  color={setActiveRouteColor(activeRoute, routes.sessions)}>
                  <Videocam />
                </IconButton>
              </Tooltip>
              {/* <Tooltip title="Clients">
                <IconButton
                  onClick={() => router.push(routes.clients)}
                  color={setActiveRouteColor(activeRoute, routes.clients)}>
                  <AccountCircle />
                </IconButton>
              </Tooltip> */}
            </MenuWrapper>
            <div>
              <Tooltip title="Profile">
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  // color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}>
                <Link href="/profile">
                  <MenuItem>Profile</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
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
