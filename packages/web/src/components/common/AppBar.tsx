import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import projectConfig from '@frontend/shared';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Settings from '@material-ui/icons/Settings';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useHandleLogout } from '@frontend/shared/hooks/auth';

export default function AppBarComponent() {
  const authenticated = useSelector(({ auth }: any) => auth.authenticated);
  const { handleLogout } = useHandleLogout();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
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
        <Link href="/">
          <Typography
            variant="h6"
            className="w-100 text-center"
            // text-lg-left text-xl-left"
            role="button">
            {projectConfig.title}
          </Typography>
        </Link>
        {
          authenticated ? <Settings /> : null
          // <Link href="/auth">
          //   <Button color="inherit">SignIn</Button>
          // </Link>
        }
      </Toolbar>
    </AppBar>
  );
}
