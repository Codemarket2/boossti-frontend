import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import projectConfig from '@frontend/shared';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Auth } from 'aws-amplify';
import { client } from '@frontend/shared/graphql';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { unsetAuthUser } from '@frontend/shared/redux/actions/auth';

export default function NavComponent() {
  const authenticated = useSelector(({ auth }) => auth.authenticated);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Auth.signOut().then(() => {
      // client.resetStore();
      dispatch(unsetAuthUser());
    });
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <Typography variant="h6" className="w-100" role="button">
            {projectConfig.title}
          </Typography>
        </Link>
        {authenticated ? (
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
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Link href="/auth">
            <Button color="inherit">SignIn</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}
