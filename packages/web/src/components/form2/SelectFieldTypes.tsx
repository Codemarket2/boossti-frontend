import { useAddFields } from '@frontend/shared/hooks/form';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { onAlert } from '../../utils/alert';
import { getFormFieldTypes } from './fieldTypes';
import InputGroup from '../common/InputGroup';
import Field, { SFieldTypes } from './Field';

import { filterValues } from './FormView';

export default function SelectFieldTypes({ field, value, formik }: SFieldTypes) {
  return (
    <>
      <InputGroup>
        <FormControl
          variant="outlined"
          fullWidth
          size="small"
          error={Boolean(formik.touched.fieldType && formik.errors.fieldType)}
        >
          <InputLabel data-testid="field-type-label" id="fieldType-simple-select-outlined-label">
            Field Type*
          </InputLabel>
          <Select
            data-testid="field-type-select"
            labelId="fieldType-simple-select-outlined-label"
            id="fieldType-simple-select-outlined"
            name="fieldType"
            value={formik.values.fieldType}
            onChange={formik.handleChange}
            label="Field Type*"
            inputProps={{ 'aria-describedby': 'fieldType-helperText' }}
            MenuProps={{ id: 'fieldType-menu' }}
          >
            {getFormFieldTypes(false)?.map((option, index) => (
              <MenuItem value={option.value} key={index}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </InputGroup>
    </>
  );
}
