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

interface IProps {
  openDrawer: boolean;
  setOpenDrawer: (arg: boolean) => void;
  handleToggleDarkMode: () => void;
  darkMode: boolean;
}

export default function DrawerContent({
  openDrawer,
  setOpenDrawer,
  handleToggleDarkMode,
  darkMode,
}: IProps) {
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
  );
}
