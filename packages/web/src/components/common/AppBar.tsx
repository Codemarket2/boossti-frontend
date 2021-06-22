import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import projectConfig from '@frontend/shared';
import { toggleDarkMode } from '@frontend/shared/redux/actions/auth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Settings from '@material-ui/icons/Settings';
import Brightness4 from '@material-ui/icons/Brightness4';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useHandleLogout } from '@frontend/shared/hooks/auth';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IOSSwitch from './IOSSwitch';

export default function AppBarComponent() {
  const { authenticated, darkMode } = useSelector(({ auth }: any) => auth);
  const { handleLogout } = useHandleLogout();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const dispatch = useDispatch();
  // const [darkMode, setDarkMode] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setDarkMode(event.target.checked);
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

  return (
    <AppBar position="fixed">
      <Toolbar>
        {authenticated ? (
          <>
            <MenuIcon onClick={() => setOpenDrawer(true)} role="button" />
            <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
              <List style={{ minWidth: 300 }}>
                <ListItem button>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
                <Divider />
                <ListItem button onClick={handleToggleDarkMode}>
                  <ListItemIcon>
                    <Brightness4 />
                  </ListItemIcon>
                  <ListItemText primary="Dark Mode" />
                  <ListItemSecondaryAction>
                    <IOSSwitch onChange={handleToggleDarkMode} checked={darkMode} name="darkMode" />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </List>
            </Drawer>
          </>
        ) : null}
        <Link href="/">
          <Typography
            variant="h6"
            className="w-100 text-center"
            // text-center text-lg-left text-xl-left"
            role="button">
            {projectConfig.title}
          </Typography>
        </Link>
        {authenticated && (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit">
              <AccountCircle />
            </IconButton>
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
        )}
      </Toolbar>
    </AppBar>
  );
}
