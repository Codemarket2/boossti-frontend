import { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

import type { ISelectFormFieldsComponentProps } from '../../SelectFormFields';
import { SelectFormMockData } from './SelectForm';

export const SelectFormFieldsMockData = {
  fieldID: 'MOCK_FIELD_ID_#123',
  fieldName: 'MOCK_FIELD_NAME',
  labelName: 'MOCK_LABEL',
  formName: SelectFormMockData.name,
  formId: SelectFormMockData._id,
};

const SelectFormFieldsMock = (props: ISelectFormFieldsComponentProps): JSX.Element => {
  const { onChange, value, disabled, error, helperText } = props;
  const { fieldID, formName, labelName, fieldName } = SelectFormFieldsMockData;

  useEffect(() => {
    onChange(fieldID, labelName, formName);
  }, []);

  return (
    <FormControl fullWidth size="small" variant="outlined" disabled={disabled} error={error}>
      <InputLabel id="select-form-field">Select form field </InputLabel>
      <Select
        labelId="select-form-field"
        name="formField"
        value={fieldID}
        onChange={(e) => {
          return onChange(e.target.value, labelName, formName);
        }}
        label="Select form field"
        data-testid="select-form-fields-mock"
      >
        <MenuItem value={fieldID}>{fieldName}</MenuItem>
      </Select>
      {error && <FormHelperText className="text-danger">{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectFormFieldsMock;
