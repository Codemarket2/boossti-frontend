import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IOSSwitch from './IOSSwitch';
import Settings from '@material-ui/icons/Settings';
import Brightness4 from '@material-ui/icons/Brightness4';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';

interface IProps {
  openDrawer: boolean;
  setOpenDrawer: (arg: boolean) => void;
  darkMode: boolean;
  admin: boolean;
}

export default function DrawerContent({ openDrawer, setOpenDrawer, darkMode, admin }: IProps) {
  return (
    <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
      <List style={{ minWidth: 300 }}>
        <ListItem button>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <Divider />
        <DarkModeToggle darkMode={darkMode} />
        <Divider />
        {admin && (
          <Link href="/admin">
            <ListItem button>
              <ListItemIcon>
                <SupervisorAccount />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItem>
          </Link>
        )}
        <Divider />
      </List>
    </Drawer>
  );
}
