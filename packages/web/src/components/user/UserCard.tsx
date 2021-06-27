import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import LoadingButton from '../common/LoadingButton';

interface IUser {
  userId: string;
  name: string;
  picture: string;
  email: string;
  active: boolean;
}

interface IProps {
  user: IUser;
  handleUpdateUserStatus: (arg1: string, arg2: boolean) => void;
}

export default function UserCard({ user, handleUpdateUserStatus }: IProps) {
  const [loading, setLoading] = useState(false);
  const updateUser = async () => {
    setLoading(true);
    await handleUpdateUserStatus(user.userId, !user.active);
    setLoading(false);
  };
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={user.name} src={user.picture} />
        </ListItemAvatar>
        <ListItemText primary={user.name} secondary={user.email} />
        <ListItemSecondaryAction>
          <LoadingButton variant="outlined" size="small" loading={loading} onClick={updateUser}>
            {user.active ? 'Block' : 'Unblock'}
          </LoadingButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
}
