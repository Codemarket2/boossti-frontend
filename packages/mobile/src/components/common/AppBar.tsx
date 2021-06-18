import React from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { useHandleLogout } from '@frontend/shared/hooks/auth';

export default function AppBar({ navigation, previous, authenticated = false }: any) {
  const { handleLogout } = useHandleLogout();
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      {authenticated && !previous ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="account-circle" color="white" onPress={openMenu} />}>
          <Menu.Item onPress={() => {}} title="Profile" disabled />
          <Menu.Item onPress={handleLogout} title="Logout" />
        </Menu>
      ) : null}
      <Appbar.Content title="Drreamz" />
      {authenticated && <Appbar.Action icon="cog" onPress={() => {}} />}
    </Appbar.Header>
  );
}
