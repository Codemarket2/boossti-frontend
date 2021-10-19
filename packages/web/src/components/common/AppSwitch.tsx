import React, { useEffect, useState } from 'react';
import { Switch } from '@material-ui/core';

import { useUpdatePublish } from '@frontend/shared/hooks/list/listItems';

interface IProps {
  id: string;
  active: boolean;
}
export default function AppSwitch({ id, active }: IProps) {
  const { handleChange, publish } = useUpdatePublish(id, active);
  console.log({ publish });
  return (
    <Switch checked={active} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
  );
}
