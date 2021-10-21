import React, { useEffect, useState } from 'react';
import { Switch } from '@material-ui/core';

import { useUpdatePublish } from '@frontend/shared/hooks/list/listItems';
import Backdrop from './Backdrop';
interface IProps {
  id: string;
  active: boolean;
}
export default function AppSwitch({ id, active }: IProps) {
  const { handleChange, publish, loading } = useUpdatePublish(id, active);
  console.log({ publish });
  if (loading) {
    return <Backdrop open={loading} />;
  }
  return (
    <Switch checked={active} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
  );
}
