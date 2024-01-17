import { useGetForm } from '@frontend/shared/hooks/form';
import { Typography } from '@mui/material';
import React from 'react';
import DisplayValue from '../form2/DisplayValue';

interface DisplayDefaultResponse {
  formId: string;
}

export default function DisplayDefaultResponse({ formId }: DisplayDefaultResponse) {
  const { data } = useGetForm(formId);
  const fields = data?.getForm?.fields?.filter((field) => field?.options?.defaultValue);

  return (
    <div>
      {fields?.length > 0 ? (
        fields?.map((field) => (
          <div key={field?._id}>
            <Typography fontWeight="bold">{field?.label}</Typography>
            <DisplayValue field={field} value={field?.options?.defaultValue} />
          </div>
        ))
      ) : (
        <Typography>Sample Text...</Typography>
      )}
    </div>
  );
}
