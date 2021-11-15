/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputGroup from '../common/InputGroup';
import { fieldTypes } from './AddField';
import TypesAutocomplete from './TypesAutocomplete';

const initialState = {
  showMenu: null,
  field: null,
  fieldIndex: null,
  showForm: false,
  // edit: false,
};

export default function FormFields({ onFieldChange, field, onClose }: any): any {
  const [values, setValues] = useState(initialState);

  const onOptionChange = (updatedOption) => {
    onFieldChange({ ...field, options: { ...field.options, ...updatedOption } });
  };

  return (
    <Paper variant="outlined">
      <Typography variant="h5" className="d-flex align-items-center">
        <Tooltip title="Go Back">
          <IconButton onClick={onClose}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <input
          width="100%"
          placeholder="Field Label"
          style={{
            background: 'rgba(0, 0, 0, 0)',
            border: 'none',
            outline: 'none',
          }}
          name="label"
          value={field.label}
          onChange={(e) => onFieldChange({ ...field, label: e.target.value })}
        />
      </Typography>
      <Divider />
      <div className="px-3">
        <InputGroup>
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel id="fieldType-simple-select-outlined-label">Field Type</InputLabel>
            <Select
              labelId="fieldType-simple-select-outlined-label"
              id="fieldType-simple-select-outlined"
              name="fieldType"
              value={field.fieldType}
              onChange={(e) => onFieldChange({ ...field, fieldType: e.target.value })}
              label="Field Type"
            >
              {fieldTypes?.map((option, index) => (
                <MenuItem value={option.value} key={index}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </InputGroup>
        {field.fieldType === 'type' && (
          <InputGroup>
            <TypesAutocomplete
              value={field.typeId}
              onChange={(newValue) => onFieldChange({ ...field, typeId: newValue })}
              error={!field.typeId}
              helperText="Required"
            />
          </InputGroup>
        )}
        <InputGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={field?.options?.multipleValues}
                onChange={({ target }) => onOptionChange({ multipleValues: target.checked })}
                name="multipleValues"
                color="primary"
              />
            }
            label="Mutiple values"
          />
        </InputGroup>
        <InputGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={field?.options?.required}
                onChange={({ target }) => onOptionChange({ required: target.checked })}
                name="required"
                color="primary"
              />
            }
            label="Required"
          />
        </InputGroup>
        <InputGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={field?.options?.halfWidth}
                onChange={({ target }) => onOptionChange({ halfWidth: target.checked })}
                name="halfWidth"
                color="primary"
              />
            }
            label="Half Width"
          />
        </InputGroup>
        {field.fieldType === 'select' && (
          <InputGroup>
            <FormLabel>
              Select Options
              <Tooltip title="Add New Option">
                <IconButton
                  color="primary"
                  onClick={() =>
                    onOptionChange({
                      selectOptions: field?.options?.selectOptions
                        ? [...field?.options?.selectOptions, '']
                        : [''],
                    })
                  }
                >
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>
            </FormLabel>
            {field?.options?.selectOptions?.map((option, index) => (
              <FormControl variant="outlined" fullWidth size="small" key={index} className="my-2">
                <InputLabel htmlFor={`outlined-adornment-${index + 1}`}>
                  Option {index + 1}
                </InputLabel>
                <OutlinedInput
                  id={`outlined-adornment-${index + 1}`}
                  type="text"
                  value={option}
                  onChange={({ target }) =>
                    onOptionChange({
                      selectOptions: field?.options?.selectOptions?.map((m, i) =>
                        i === index ? target.value : m,
                      ),
                    })
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          onOptionChange({
                            selectOptions: field?.options?.selectOptions?.filter(
                              (m, i) => i !== index,
                            ),
                          })
                        }
                        edge="end"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={65}
                />
              </FormControl>
            ))}
          </InputGroup>
        )}
      </div>
    </Paper>
  );
}
