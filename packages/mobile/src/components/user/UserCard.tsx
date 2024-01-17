import React, { useState } from 'react';
import { List, Avatar, TouchableRipple, ActivityIndicator } from 'react-native-paper';

interface IUser {
  userId: string;
  name: string;
  picture: string;
  email: string;
  active: boolean;
}

interface IProps {
  item: IUser;
  handleUpdateUserStatus: (arg1: string, arg2: boolean) => void;
}

export default function UserCard({ item: user, handleUpdateUserStatus }: IProps) {
  const [loading, setLoading] = useState(false);
  const updateUser = async () => {
    setLoading(true);
    await handleUpdateUserStatus(user.userId, !user.active);
    setLoading(false);
  };
  return (
    <List.Item
      title={user.name}
      description={user.email}
      left={(props) => <Avatar.Image {...props} source={{ uri: user.picture }} />}
      right={(props) => (
        <TouchableRipple disabled={loading} {...props} onPress={updateUser}>
          {loading ? (
            <ActivityIndicator animating={true} color="red" />
          ) : (
            <List.Icon icon={user.active ? 'account-check' : 'account-cancel'} />
          )}
        </TouchableRipple>
      )}
    />
  );
}
