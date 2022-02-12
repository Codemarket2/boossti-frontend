import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { InputLabel, MenuItem, TextField } from '@material-ui/core';
import InputGroup from '../common/InputGroup';
import RichTextarea from '../common/RichTextarea2';

export default function FormSetting({ settings, onChange }: any): any {
  console.log({ settings });

  return (
    <Paper variant="outlined" className="p-2">
      <div style={{ margin: '20px' }}>
        <TextField
          style={{ width: '200px' }}
          variant="outlined"
          select
          id="demo-simple-select"
          value={settings?.widgetType ?? 'fullForm'}
          label="Widget type"
          onChange={({ target }) => onChange({ widgetType: target.value })}
        >
          <MenuItem value="fullForm">Full Form</MenuItem>
          <MenuItem value="leaderboard">Leaderboad</MenuItem>
          <MenuItem value="oneField">One field at a time</MenuItem>
          <MenuItem value="button">Button</MenuItem>
        </TextField>
      </div>
      {settings?.widgetType === 'leaderboard' && (
        <InputGroup>
          <h3>Leader Board</h3>
          <div style={{ display: 'flex', marginTop: '10px', width: '50%' }}>
            <input
              className="form-control mr-3"
              value={settings?.minValue}
              onChange={(e) => onChange({ minValue: e.target.value })}
              placeholder="min value"
            />
            <input
              className="form-control"
              value={settings?.maxValue}
              onChange={(e) => onChange({ maxValue: e.target.value })}
              placeholder="max value"
            />
          </div>
        </InputGroup>
      )}
      <InputGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={!settings?.authRequired}
              onChange={({ target }) => onChange({ authRequired: !target.checked })}
              name="authRequired"
              color="primary"
            />
          }
          label="Authentication required to submit form"
        />
      </InputGroup>
      <InputGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={settings?.multipleResponses ?? false}
              onChange={({ target }) => onChange({ multipleResponses: target.checked })}
              name="multipleValues"
              color="primary"
            />
          }
          label="One user can submit mutiple responses"
        />
      </InputGroup>
      <InputGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={settings?.editResponse ?? false}
              onChange={({ target }) => onChange({ editResponse: target.checked })}
              name="multipleValues"
              color="primary"
            />
          }
          label="Allow user to edit their response"
        />
      </InputGroup>
      <InputGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={settings?.showFormTitle ?? false}
              onChange={({ target }) => onChange({ showFormTitle: target.checked })}
              name="showFormTitle"
              color="primary"
            />
          }
          label="Show form title"
        />
      </InputGroup>
      <InputGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={settings?.showResponses ?? false}
              onChange={({ target }) => onChange({ showResponses: target.checked })}
              name="showFormResponses"
              color="primary"
            />
          }
          label="Allow users to view all form responses"
        />
      </InputGroup>

      <InputGroup>
        <InputLabel>After Form Submit Message</InputLabel>
        <RichTextarea
          value={settings?.onSubmitMessage || ''}
          onChange={(newValue) => onChange({ onSubmitMessage: newValue })}
        />
      </InputGroup>
    </Paper>
  );
}
