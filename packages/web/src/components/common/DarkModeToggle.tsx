import { useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import { useSelector, useDispatch } from 'react-redux';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Switch from '@mui/material/Switch';
import Brightness4 from '@mui/icons-material/Brightness4';
import { toggleDarkMode } from '@frontend/shared/redux/actions/auth';

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
        <Switch onChange={handleToggleDarkMode} checked={darkMode} name="darkMode" />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
