import React from 'react';
import { Divider, List, Switch } from 'react-native-paper';
import { toggleDarkMode } from '@frontend/shared/redux/actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import Screen from './Screen';

export default function Drawer({ navigation }: any) {
  const darkMode = useSelector(({ auth }: any) => auth.darkMode);
  const dispatch = useDispatch();
  return (
    <Screen safeArea>
      <List.Item title="Settings" left={(props) => <List.Icon {...props} icon="cog" />} />
      <Divider />
      <List.Item
        title="Dark Mode"
        left={(props) => <List.Icon {...props} icon="brightness-4" />}
        right={(props) => (
          <Switch {...props} value={darkMode} onValueChange={() => dispatch(toggleDarkMode())} />
        )}
      />
      <Divider />
    </Screen>
  );
}
