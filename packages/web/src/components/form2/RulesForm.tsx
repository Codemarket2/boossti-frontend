import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { OutlinedInput } from '@mui/material';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';

interface IProps {
  onCancel?: () => void;
  // onSave?: (payload: any, operation: string) => void;
  fields: any[];
}

const RulesForm = ({ onCancel, fields }: IProps) => {
  const ruleOptionsTemplates = [{ label: 'is Equal to', value: 'isEqualTo' }];

  const [condition, setCondition] = useState('');
  const [fieldSelected, setFieldSelected] = useState('');
  const [customValue, setCustomValue] = useState('');

  function fieldList() {
    return (
      <FormControl fullWidth variant="outlined" size="small" className="pl-2">
        {!(fieldSelected === 'custom') && (
          <InputLabel id="variablefield-simple-select-outlined-label">Field</InputLabel>
        )}
        <Select
          labelId="variablefield-simple-select-outlined-label"
          id="variablefield-simple-select-outlined"
          name="value"
          value={fieldSelected}
          onChange={({ target }) => setFieldSelected(target.value)}
          label="Field"
        >
          {fields?.map((field) => (
            <MenuItem value={field._id}>{field.label}</MenuItem>
          ))}

          <MenuItem value="custom">
            <em>Custom Value</em>
          </MenuItem>
        </Select>

        {fieldSelected === 'custom' && (
          <OutlinedInput
            className="ml-4"
            type="text"
            value={customValue}
            placeholder="Enter custom value"
            onChange={({ target }) => setCustomValue(target.value)}
          />
        )}
      </FormControl>
    );
  }

  return (
    <form className="px-2">
      <InputGroup>
        <FormControl variant="outlined" fullWidth size="small">
          <InputLabel id="condition-simple-select-outlined-label">Condition</InputLabel>
          <Select
            labelId="condition-simple-select-outlined-label"
            id="condition-simple-select-outlined"
            name="condition"
            value={condition}
            onChange={({ target }) => setCondition(target.value)}
            label={` Condition `}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {ruleOptionsTemplates?.map((option, index) => (
              <MenuItem key={index} value={option?.value}>
                {option?.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </InputGroup>

      <InputGroup>{condition && fieldList()}</InputGroup>

      <InputGroup>
        <LoadingButton
          type="submit"
          size="small"
          // loading={formik.isSubmitting}
        >
          Save
        </LoadingButton>
        <Button
          className="ml-2"
          variant="outlined"
          size="small"
          // disabled={formik.isSubmitting}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </InputGroup>
    </form>
  );
};

export default RulesForm;
