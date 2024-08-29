import { TFormAction } from '@frontend/shared/hooks/form/formActions';
import { IForm, IResponse } from '@frontend/shared/types';
import { FormActionElementTypeEnum } from '@frontend/shared/types/formActions';
import React from 'react';
import AddToCartButton from '../../cart/AddToCartButton';

export default function AddElementToResponse({
  form,
  response,
  action,
}: {
  form: IForm;
  response: IResponse;
  action: TFormAction;
}) {
  if (action?.elementType === FormActionElementTypeEnum.Button) {
    return <AddToCartButton form={form} response={response} action={action} />;
  }
  return <div>{action?.elementType}</div>;
}
