import { Button } from '@mui/material';
import { useAddToCart } from '@frontend/shared/hooks/cart/useAddToCart';
import React, { useEffect } from 'react';
import { IForm, IResponse } from '@frontend/shared/types';
import { TFormAction } from '@frontend/shared/hooks/form/formActions';
import { useGetResponses } from '@frontend/shared/hooks/response';
import { useGetForm } from '@frontend/shared/hooks/form';

export default function AddToCartButton({
  form,
  response,
  action,
}: {
  form: IForm;
  response: IResponse;
  action: TFormAction;
}) {
  const { handleOnClick } = useAddToCart(form, response, action);

  return (
    <div>
      <Button sx={{ my: 2 }} variant="contained" onClick={handleOnClick}>
        {action?.elementButtonLabel || 'Button'}
      </Button>
      {/* <Button variant="contained" onClick={addToCart}>
        Add to Cart
      </Button> */}
    </div>
  );
}
