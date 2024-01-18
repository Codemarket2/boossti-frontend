import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import type { ISelectFormComponentProps } from '../../SelectForm';

export const SelectFormMockData: Parameters<ISelectFormComponentProps['onChange']>[0] = {
  __typename: 'Form',
  _id: '62e14528bee57e3af07bd0ca',
  name: 'MOCK_FORM',
  slug: 'MOCK_FORM',
  createdBy: {
    __typename: 'Response',
    _id: '629e24b250b4444d5927a894',
    values: [
      {
        __typename: 'Value',
        field: '6297c9d7d87f872dbe83b96d',
        value: '',
      },
      {
        __typename: 'Value',
        field: '6296a2b0c0c34edd95d439b4',
        value: 'Sumithra',
      },
      {
        __typename: 'Value',
        field: '6296a2b99a25767d06f4a8c9',
        value: 'Devi',
      },
      {
        __typename: 'Value',
        field: '62969ff967ee716d1d052fea',
        value: 'mysumifoods@gmail.com',
      },
      {
        __typename: 'Value',
        field: '62979114b9b08911857e479a',
        value: '',
      },
      {
        __typename: 'Value',
        field: '6297cd399181f4c2e0fb0e7b',
        value: '',
      },
      {
        __typename: 'Value',
        field: '6297cd90689fa4870c25d387',
        value: '',
      },
    ],
  },
  createdAt: '2022-07-27T14:01:12.792Z',
};

const SelectFormMock = (props: ISelectFormComponentProps): JSX.Element => {
  const { onChange, value, disabled, error, helperText, label, placeholder } = props;

  useEffect(() => {
    onChange(SelectFormMockData);
  }, []);

  return (
    <TextField
      data-testid="select-form-mock"
      value={value}
      disabled={disabled}
      error={error}
      label={label}
      helperText={helperText}
      placeholder={placeholder}
      type="text"
    />
  );
};

export default SelectFormMock;
