import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MailIcon from '@mui/icons-material/Mail';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHandleLogout } from '@frontend/shared/hooks/auth';

export default function LogoutButton() {
  const { attributes, admin } = useSelector(({ auth }: any) => auth);
  const { handleLogout } = useHandleLogout();
  const [showMenu, setShowMenu] = useState(null);
  const handleClose = () => {
    setShowMenu(null);
  };
  return (
    <div>
      <Tooltip title="Profile">
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={(e) => setShowMenu(e?.currentTarget)}
          color="inherit"
          size="large"
        >
          <AccountCircleIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={showMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(showMenu)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemIcon className="mr-n3">
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={attributes?.name} />
        </MenuItem>
        <MenuItem>
          <ListItemIcon className="mr-n3">
            <MailIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={attributes?.email} />
        </MenuItem>
        {admin && (
          <MenuItem>
            <ListItemIcon className="mr-n3">
              <AdminPanelSettings fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="superadmin" />
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            const anwser = confirm('Are you sure you want to logout');
            if (anwser) {
              handleClose();
              handleLogout();
            } else {
              handleClose();
            }
          }}
        >
          <ListItemIcon className="mr-n3">
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  );
}
