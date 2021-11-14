import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputGroup from '../common/InputGroup';

export default function FormSetting({ settings, onChange }: any): any {
  return (
    <Paper variant="outlined" className="p-2">
      <InputGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={settings.multipleResponses}
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
              checked={settings.editResponse}
              onChange={({ target }) => onChange({ editResponse: target.checked })}
              name="multipleValues"
              color="primary"
            />
          }
          label="Allow user to edit their response"
        />
      </InputGroup>
    </Paper>
  );
}
