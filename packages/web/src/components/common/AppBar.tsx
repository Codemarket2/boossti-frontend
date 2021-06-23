import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import projectConfig from '@frontend/shared';
import { toggleDarkMode } from '@frontend/shared/redux/actions/auth';
import { useHandleLogout } from '@frontend/shared/hooks/auth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ChatBubble from '@material-ui/icons/ChatBubble';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Event from '@material-ui/icons/Event';
import Videocam from '@material-ui/icons/Videocam';
import Group from '@material-ui/icons/Group';
import Tooltip from '@material-ui/core/Tooltip';
import Drawer from './Drawer';
import styled from 'styled-components';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { routes } from '../../utils/routes';

const setActiveRouteColor = (activeRoute, linkRoute) => {
  return activeRoute === linkRoute ? 'secondary' : 'inherit';
};

const StyledTitle = styled(Typography)`
  width: 100%;
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
  const { authenticated, darkMode } = useSelector(({ auth }: any) => auth);
  const { handleLogout } = useHandleLogout();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();
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

  const handleToggleDarkMode = () => {
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
    dispatch(toggleDarkMode());
  };

  useEffect(() => {
    const getDarkMode = async () => {
      const darkModePersisted = await localStorage.getItem('darkMode');
      if (Boolean(JSON.parse(darkModePersisted)) !== darkMode) {
        dispatch(toggleDarkMode());
      }
    };
    getDarkMode();
  }, []);

  useEffect(() => {
    if (activeRoute !== router.pathname) {
      setActiveRoute(router.pathname);
      ``;
    }
  }, []);

  return (
    <AppBar position={matches ? 'sticky' : 'static'} color={darkMode ? 'default' : 'primary'}>
      <Toolbar>
        {authenticated ? (
          <>
            <Tooltip title="Menu">
              <IconButton color="inherit">
                <MenuIcon onClick={() => setOpenDrawer(true)} role="button" className="mr-0" />
              </IconButton>
            </Tooltip>
            <Drawer
              handleToggleDarkMode={handleToggleDarkMode}
              setOpenDrawer={setOpenDrawer}
              openDrawer={openDrawer}
              darkMode={darkMode}
            />
          </>
        ) : null}
        <Link href="/">
          <StyledTitle variant="h6" role="button">
            {projectConfig.title}
          </StyledTitle>
        </Link>
        {authenticated && (
          <>
            <MenuWrapper>
              <Tooltip title="Inbox">
                <IconButton color={setActiveRouteColor(activeRoute, routes.inbox)}>
                  <ChatBubble onClick={() => router.push(routes.inbox)} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Calendar">
                <IconButton color={setActiveRouteColor(activeRoute, routes.calendar)}>
                  <CalendarToday onClick={() => router.push(routes.calendar)} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Offerings">
                <IconButton color={setActiveRouteColor(activeRoute, routes.offerings)}>
                  <Event onClick={() => router.push(routes.calendar)} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Sessions">
                <IconButton color={setActiveRouteColor(activeRoute, routes.sessions)}>
                  <Videocam onClick={() => router.push(routes.sessions)} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Clients">
                <IconButton color={setActiveRouteColor(activeRoute, routes.clients)}>
                  <Group onClick={() => router.push(routes.clients)} />
                </IconButton>
              </Tooltip>
            </MenuWrapper>
            <div>
              <Tooltip title="Profile">
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit">
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
                <MenuItem disabled onClick={handleClose}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
