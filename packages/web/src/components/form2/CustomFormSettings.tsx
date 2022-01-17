import { useState } from 'react';
import { Switch, Typography } from '@material-ui/core';
import FormSetting from './FormSetting';

const initialState = {
  custom: false,
  settings: null,
};

export default function CustomFormSettings({
  customSettings,
  settings,
  toggleCustomSettings,
  onSettingsChange,
}: any): any {
  const [state, setState] = useState({ customSettings, settings });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Switch
          inputProps={{ 'aria-label': 'Use default settings' }}
          checked={state.customSettings}
          color="primary"
          onChange={(e) => {
            setState({ ...state, customSettings: e.target.checked });
            toggleCustomSettings(e.target.checked);
          }}
        />
        <Typography>Use custom form settings</Typography>
      </div>

      {state.customSettings && (
        <FormSetting
          settings={state.settings}
          onChange={(val) => {
            setState({ ...state, settings: { ...state.settings, ...val } });
            onSettingsChange({ ...state.settings, ...val });
          }}
        />
      )}
    </div>
  );
}
