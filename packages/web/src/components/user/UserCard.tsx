import { useState } from 'react';
import Link from 'next/link';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '../common/LoadingButton';

interface IUser {
  userId: string;
  name: string;
  picture: string;
  email: string;
  active: boolean;
}

interface IProps {
  user: any;
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
      <ListItem button alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={user.name} src={user.picture} />
        </ListItemAvatar>
        <Link href={`/user/${user._id}`}>
          <ListItemText primary={user.name} secondary={user.email} />
        </Link>
        <ListItemSecondaryAction>
          <LoadingButton variant="contained" size="small" loading={loading} onClick={updateUser}>
            {user.active ? 'Block' : 'Unblock'}
          </LoadingButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
}
