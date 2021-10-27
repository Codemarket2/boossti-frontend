import React from 'react';
import Switch from '@material-ui/core/Switch';

import { useUpdateAuthentication, useUpdatePublish } from '@frontend/shared/hooks/list/listItems';

interface IProps {
  id: string;
  authUser?: boolean;
  active?: boolean;
  slug: string;
  fieldUser: string;
}
export default function AppSwitch2({ id, authUser, slug, active, fieldUser }: IProps) {
  const { handleOnChange } = useUpdateAuthentication(id, authUser, slug);
  const { handleOnChange: handleUpdateOnChange } = useUpdatePublish(id, active, slug);

  return (
    <>
      {fieldUser === 'active' && (
        <Switch
          checked={active}
          onChange={handleUpdateOnChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      )}
      {fieldUser === 'authUser' && (
        <Switch
          checked={authUser}
          onChange={handleOnChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      )}
    </>
  );
}
