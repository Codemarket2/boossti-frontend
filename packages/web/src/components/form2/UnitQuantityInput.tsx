import { IFieldOptions } from '@frontend/shared/types/form';
import { quantities } from '@frontend/shared/utils/quantities';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React from 'react';

interface IProps {
  value: any;
  label: string;
  options: Partial<IFieldOptions>;
  onChange: (newValue: any) => void;
  error: boolean;
  helperText: string;
  disabled: boolean;
}

const getDefaultUnit = ({ value, options }: { value: any; options: any }) => {
  let unit = value?.options?.unit;
  if (!unit) {
    unit = options?.unit;
    if (!unit) {
      unit = quantities?.[options?.physicalQuantity]?.[0];
    }
  }
  return unit;
};

export default function UnitQuantityInput({
  value,
  label,
  options,
  onChange,
  error,
  helperText,
  disabled,
}: IProps) {
  const onChangeQuantity = ({ target }) => {
    onChange({
      valueNumber: target.value,
      options: { unit: getDefaultUnit({ value, options }) },
    });
  };

  return (
    <>
      {!options?.physicalQuantity ? (
        <Typography color="error">Select Physical Quantity from field options</Typography>
      ) : options?.unit ? (
        <TextField
          type="number"
          size="small"
          placeholder={label}
          value={value?.valueNumber}
          InputProps={{
            endAdornment: <InputAdornment position="end">{options?.unit}</InputAdornment>,
          }}
          onChange={onChangeQuantity}
          disabled={disabled}
        />
      ) : (
        <div className="d-flex">
          <TextField
            type="number"
            size="small"
            placeholder={label}
            value={value?.valueNumber}
            onChange={onChangeQuantity}
            disabled={disabled}
          />
          <FormControl size="small" disabled={Boolean(options?.unit)}>
            <InputLabel id="unit-select-label">Unit</InputLabel>
            <Select
              fullWidth
              labelId="unit-select-label"
              id="unit-select"
              label="Unit"
              value={value?.options?.unit || quantities?.[options?.physicalQuantity]?.[0]}
              onChange={({ target }) => onChange({ options: { unit: target.value } })}
            >
              {quantities?.[options?.physicalQuantity]?.map((unit, i) => (
                <MenuItem value={unit} key={i}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
      {error && <FormHelperText className="text-danger">{helperText}</FormHelperText>}
    </>
  );
}
