import { useState } from 'react';
import {
  Switch,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';
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
      <div style={{ margin: '20px' }}>
        <TextField
          style={{ width: '200px' }}
          variant="outlined"
          select
          id="demo-simple-select"
          value={state?.settings?.widgetType ?? 'fullForm'}
          label="Widget type"
          onChange={(event) => {
            const type = event.target.value;

            setState({ ...state, settings: { ...state.settings, widgetType: type } });
            onSettingsChange({ ...state.settings, widgetType: type });
          }}
        >
          <MenuItem value="fullForm">Full Form</MenuItem>
          <MenuItem value="leaderboard">Leaderboad</MenuItem>
          <MenuItem value="oneField">One field at a time</MenuItem>
          <MenuItem value="button">Button</MenuItem>
        </TextField>
      </div>
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
