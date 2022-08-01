import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React from 'react';

interface ConditionValueSelectProps {
  fields: any[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

export default function ConditionValueSelect({
  value,
  onChange,
  fields,
  label = 'Value',
  error,
  errorMessage = 'Required',
}: ConditionValueSelectProps) {
  return (
    <>
      <FormControl size="small" fullWidth error={error}>
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={({ target }) => onChange(target.value)}>
          <MenuItem value="constantValue">Constant Value</MenuItem>
          <ListSubheader>Global state</ListSubheader>
          <MenuItem value="user.id">user.id</MenuItem>
          <MenuItem value="user.email">user.email</MenuItem>
          <MenuItem value="user.name">user.name</MenuItem>
          {fields?.length > 0 && <ListSubheader>Form fields</ListSubheader>}
          {fields?.map((formField) => (
            <MenuItem value={formField?._id} key={formField?._id}>
              {formField?.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
      {/* <TextField
        fullWidth
        size="small"
        label="Constant value"
        value={condition?.constantValue}
        onChange={({ target }) => onChange({ constantValue: target.value }, index)}
      /> */}
    </>
  );
}
