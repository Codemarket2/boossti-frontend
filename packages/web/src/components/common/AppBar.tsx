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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Notification from '../notification/Notification';
import Drawer from './Drawer';
import { routes } from '../../utils/routes';
import { useDarkMode } from './DarkModeToggle';

const setActiveRouteColor = (activeRoute, linkRoute) => {
  return activeRoute === linkRoute ? 'primary' : 'default';
};

const StyledTitle = styled(Typography)`
  width: 100%;
  cursor: pointer;
  font-weight: bold !important;
  ${(props) => props.theme.breakpoints.down('xs')} {
    text-align: center !important;
  }
`;
const StyledImageContainer = styled.div`
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
  const { authenticated, admin, attributes } = useSelector(({ auth }: any) => auth);
  const { setting } = useSelector((state: any) => state);
  const { handleLogout } = useHandleLogout();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState<string>('/');
  useDarkMode();
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
    }
  }, []);

  return (
    <AppBar elevation={1} position={matches ? 'sticky' : 'static'} color="inherit">
      <Toolbar>
        {authenticated ? (
          <>
            <Tooltip title="Menu">
              <IconButton onClick={() => setShowDrawer(true)} color="inherit">
                <MenuIcon role="button" className="mr-0" />
              </IconButton>
            </Tooltip>
            <Drawer
              toggleDrawer={setShowDrawer}
              showDrawer={showDrawer}
              // darkMode={darkMode}
              admin={admin}
            />
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
            <Notification />
            <MenuWrapper>
              <Tooltip title="Home">
                <IconButton
                  onClick={() => router.push(routes.feeds)}
                  color={setActiveRouteColor(activeRoute, routes.feeds)}
                >
                  <HomeIcon />
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
                  // color="inherit"
                >
                  <AccountCircleIcon />
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
                onClose={handleClose}
              >
                <Link href={`/user/${attributes['custom:_id']}`}>
                  <MenuItem>
                    <ListItemIcon className="mr-n4">
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </MenuItem>
                </Link>
                <Link href="/create-post" passHref>
                  <MenuItem>
                    <ListItemIcon className="mr-n4">
                      <AddIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Create Post" />
                  </MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon className="mr-n4">
                    <ExitToAppIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
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
