import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import InputGroup from '../common/InputGroup';
import RichTextarea from '../common/RichTextarea2';

export default function FormSetting({ settings, onChange }: any): any {
  return (
    <Paper variant="outlined" className="p-2">
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
              checked={settings?.multipleResponses}
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
              checked={settings?.editResponse}
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
              checked={settings?.showFormTitle}
              onChange={({ target }) => onChange({ showFormTitle: target.checked })}
              name="showFormTitle"
              color="primary"
            />
          }
          label="Show form title"
        />
      </InputGroup>
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
