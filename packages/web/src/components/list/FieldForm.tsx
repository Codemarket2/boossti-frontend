import { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import InputGroup from '../common/InputGroup';

interface IProps {
  onCancel: () => void;
}

const options = [
  { _id: 1, title: 'Doctors' },
  { _id: 2, title: 'Hospital' },
  { _id: 2, title: 'Supplements' },
];

export default function FieldForm({ onCancel }: IProps) {
  const [state, setState] = useState({ label: '', fieldType: '' });

  const [value, setValue] = useState<string | null>();
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <form>
        <InputGroup>
          <TextField
            required
            fullWidth
            label="Label"
            variant="outlined"
            // size="small"
            value={state.label}
            onChange={({ target }) => setState({ ...state, label: target.value })}
          />
        </InputGroup>
        <InputGroup>
          <FormControl component="fieldset">
            <FormLabel component="legend">Field Type</FormLabel>
            <RadioGroup
              aria-label="fieldType"
              name="fieldType"
              value={state.fieldType}
              onChange={({ target }) => setState({ ...state, fieldType: target.value })}>
              <FormControlLabel
                value="string"
                control={<Radio required color="primary" />}
                label="String"
              />
              <FormControlLabel
                value="type"
                control={<Radio required color="primary" />}
                label="Type"
              />
            </RadioGroup>
          </FormControl>
        </InputGroup>
        {state.fieldType === 'type' && (
          <InputGroup>
            <Autocomplete
              value={value}
              onChange={(event: any, newValue: string | null) => {
                setValue(newValue);
              }}
              getOptionLabel={(option) => option.title}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              options={options}
              renderInput={(params) => (
                <TextField required fullWidth {...params} label="Select Type" variant="outlined" />
              )}
            />
          </InputGroup>
        )}
        <InputGroup>
          <Button type="submit" variant="contained" size="small" color="primary" className="mr-2">
            Save
          </Button>
          <Button variant="outlined" size="small" onClick={onCancel}>
            Cancel
          </Button>
        </InputGroup>
      </form>
    </div>
  );
}
