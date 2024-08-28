import { TFormAction } from '@frontend/shared/hooks/form/formActions';
import { IForm, IResponse } from '@frontend/shared/types';
import { FormActionElementTypeEnum } from '@frontend/shared/types/formActions';
import { Button } from '@mui/material';
import React from 'react';

export default function AddElementToResponse({
  form,
  response,
  action,
}: {
  form: IForm;
  response: IResponse;
  action: TFormAction;
}) {
  const handleOnClick = () => {
    //
  };

  if (action?.elementType === FormActionElementTypeEnum.Button) {
    return (
      <Button sx={{ my: 2 }} variant="contained" onClick={handleOnClick}>
        {action?.elementButtonLabel || 'Button'}
      </Button>
    );
  }
  return <div>{action?.elementType}</div>;
}
