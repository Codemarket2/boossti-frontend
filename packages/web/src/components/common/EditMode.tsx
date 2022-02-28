import React from 'react';
import Settings from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import { updateSettingAction } from '@frontend/shared/redux/actions/setting';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@material-ui/core';

export default function EditMode() {
  const { setting } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  return (
    <>
      <Tooltip title="Toggle edit mode">
        <IconButton
          color={setting.editMode ? 'primary' : 'default'}
          aria-label="settings"
          onClick={() => dispatch(updateSettingAction({ editMode: !setting.editMode }))}
        >
          <Settings />
        </IconButton>
      </Tooltip>
    </>
  );
}
