import { useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { useSelector, useDispatch } from 'react-redux';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Brightness4 from '@material-ui/icons/Brightness4';
import { toggleDarkMode } from '@frontend/shared/redux/actions/auth';
import IOSSwitch from './IOSSwitch';

export const useDarkMode = () => {
  const { darkMode } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const getDarkMode = async () => {
      const darkModePersisted = await localStorage.getItem('darkMode');
      if (Boolean(JSON.parse(darkModePersisted)) !== darkMode) {
        dispatch(toggleDarkMode());
      }
    };
    getDarkMode();
  }, []);
};

export default function DarkModeToggle() {
  const { darkMode } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const handleToggleDarkMode = () => {
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
    dispatch(toggleDarkMode());
  };

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
