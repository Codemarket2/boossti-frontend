import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import projectConfig from '@frontend/shared';
import { useHandleLogout } from '@frontend/shared/hooks/auth';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import HomeIcon from '@mui/icons-material/Home';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Notification from '../notification/Notification';
import Drawer from './Drawer';
// import { routes } from '../../utils/routes';
import { useDarkMode } from './DarkModeToggle';

// const setActiveRouteColor = (activeRoute, linkRoute) => {
//   return activeRoute === linkRoute ? 'primary' : 'default';
// };

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
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

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
    <AppBar elevation={1} position={matches ? 'sticky' : 'static'} color="primary">
      <Toolbar>
        {authenticated ? (
          <>
            <Tooltip title="Menu">
              <IconButton onClick={() => setShowDrawer(true)} color="inherit" size="large">
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
              {/* <Tooltip title="Home">
                <IconButton
                  onClick={() => router.push(routes.feeds)}
                  color={setActiveRouteColor(activeRoute, routes.feeds)}
                >
                  <HomeIcon />
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
                  color="inherit"
                  size="large"
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
                {/* <Link href={`/user/${attributes['custom:_id']}`}>
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
                </Link> */}
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
