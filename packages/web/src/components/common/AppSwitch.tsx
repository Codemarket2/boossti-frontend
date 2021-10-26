import React from 'react';
import Switch from '@material-ui/core/Switch';

import { useUpdatePublish } from '@frontend/shared/hooks/list/listItems';
interface IProps {
  id: string;
  active: boolean;
  slug: string;
}
export default function AppSwitch({ id, active, slug }: IProps) {
  const { handleOnChange } = useUpdatePublish(id, active, slug);

  return (
    <Switch
      checked={active}
      onChange={handleOnChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}
