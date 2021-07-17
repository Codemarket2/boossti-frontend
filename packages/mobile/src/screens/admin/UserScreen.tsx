import React from 'react';
import { Title } from 'react-native-paper';
import Screen from '../../components/common/Screen';
import UsersList from '../../components/user/UsersList';

export default function UserScreen() {
  return (
    <Screen>
      {/* <Title>Users</Title> */}
      <UsersList />
    </Screen>
  );
}
