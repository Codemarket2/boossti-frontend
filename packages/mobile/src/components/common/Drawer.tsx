import React from 'react';
import { Divider, List, Switch, TouchableRipple } from 'react-native-paper';
import { toggleDarkMode } from '@frontend/shared/redux/actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import Screen from './Screen';

export default function Drawer({ navigation }: any) {
  const { darkMode, admin } = useSelector(({ auth }: any) => auth);
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
      {admin && (
        <>
          <TouchableRipple onPress={() => navigation.navigate('AdminStack')}>
            <List.Item
              title="Admin"
              left={(props) => <List.Icon {...props} icon="account-supervisor" />}
            />
          </TouchableRipple>
          <Divider />
        </>
      )}
    </Screen>
  );
}
