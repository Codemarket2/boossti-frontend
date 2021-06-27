import React, { useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import { useSelector, useDispatch } from 'react-redux';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IOSSwitch from './IOSSwitch';
import Settings from '@material-ui/icons/Settings';
import Brightness4 from '@material-ui/icons/Brightness4';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import { toggleDarkMode } from '@frontend/shared/redux/actions/auth';
import Link from 'next/link';

interface IProps {
  darkMode: boolean;
}

export default function DarkModeToggle({ darkMode }: IProps) {
  const dispatch = useDispatch();
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

  return (
    <ListItem button onClick={handleToggleDarkMode}>
      <ListItemIcon>
        <Brightness4 />
      </ListItemIcon>
      <ListItemText primary="Dark Mode" />
      <ListItemSecondaryAction>
        <IOSSwitch onChange={handleToggleDarkMode} checked={darkMode} name="darkMode" />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
