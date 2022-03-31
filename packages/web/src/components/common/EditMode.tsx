import React from 'react';
import Settings from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import { updateSettingAction } from '@frontend/shared/redux/actions/setting';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';

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
          size="large"
        >
          <Settings />
        </IconButton>
      </Tooltip>
    </>
  );
}
