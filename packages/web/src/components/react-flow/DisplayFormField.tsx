import { useGetForm } from '@frontend/shared/hooks/form';
import { Typography } from '@mui/material';
import { useState } from 'react';
import ErrorLoading from '../common/ErrorLoading';
import Field from '../form2/Field';

interface IProps {
  formId: string;
  fieldId: string;
}

export default function DisplayFormField({ formId, fieldId }: IProps) {
  const [value, setValue] = useState(null);
  const { data, error } = useGetForm(formId);

  if (!data?.getForm || error) {
    return <ErrorLoading error={error} />;
  }

  const field = data?.getForm?.fields?.find((f) => f?._id === fieldId);

  if (field?._id) {
    return (
      <div>
        <Typography color={field?.options?.required && 'error'}>
          {field?.label}
          {field?.options?.required && '*'}
        </Typography>
        <Field {...field} value={value} onChangeValue={setValue} />
      </div>
    );
  }

  return <Typography>Field not found</Typography>;
}
