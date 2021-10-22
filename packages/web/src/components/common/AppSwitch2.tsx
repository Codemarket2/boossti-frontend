import React, { useEffect, useState } from 'react';
import { Switch } from '@material-ui/core';

import { useUpdateAuthentication } from '@frontend/shared/hooks/list/listItems';
import Backdrop from './Backdrop';
interface IProps {
  id: string;
  authUser: boolean;
}
export default function AppSwitch2({ id, authUser }: IProps) {
  const { handleChange, authenticateUser, loading } = useUpdateAuthentication(id, authUser);
  console.log({ authenticateUser });
  if (loading) {
    return <Backdrop open={loading} />;
  }
  return (
    <Switch
      checked={authUser}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}
