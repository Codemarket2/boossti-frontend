import { useEffect, useState } from 'react';
import { useGetForm } from '../form';
import { useCreateUpdateResponse, useGetResponses } from '../response';
import { IForm, IResponse } from '../../types';
import { TFormAction } from '../form/formActions';

const DEFAULT_QUANTITY = 0;
const DEFAULT_CART_STATUS = 'PENDING';

export const useAddToCart = (
  productForm: IForm,
  productResponse: IResponse,
  action: TFormAction,
) => {
  const { handleCreateUpdateResponse } = useCreateUpdateResponse({
    onAlert: () => {},
    workflowId: null,
    parentResponseId: null,
  });

  const [alreadyInCart, setAlreadyInCart] = useState(false);

  const { data: cartFormData } = useGetForm(action.addToCartConfig.cartForm?._id);
  const { data: cartItemFormData } = useGetForm(action.addToCartConfig.cartItemForm?._id);
  const { data: cartFormResponses } = useGetResponses({
    onlyMy: true,
    formId: action.addToCartConfig.cartForm?._id,
    valueFilter: {
      'values.value': DEFAULT_CART_STATUS,
      'values.field': action.addToCartConfig.cartFormStatusFieldId,
    },
    limit: 1,
  });

  useEffect(() => {
    if (cartFormResponses?.getResponses?.data?.[0]) {
      // debugger;
    }
  }, [cartFormResponses]);

  const getCartItemResponseObject = () => {
    if (
      !action.addToCartConfig?.cartItemFormProductFieldId ||
      !action.addToCartConfig?.cartItemFormQuantityFieldId
    ) {
      throw new Error(
        'cartItemFormProductFieldId, cartItemFormQuantityFieldId not found in action.addToCartConfig',
      );
    }

    const newResponse = {
      formId: action.addToCartConfig?.cartItemForm._id,
      values: [
        {
          field: action.addToCartConfig?.cartItemFormProductFieldId,
          value: '',
          response: productResponse?._id,
        },
        {
          field: action.addToCartConfig?.cartItemFormQuantityFieldId,
          value: '',
          valueNumber: DEFAULT_QUANTITY,
        },
      ],
    };

    return newResponse;
  };

  const handleOnClick = async () => {
    try {
      const responseObj = getCartItemResponseObject();
      const cartItemResponse = await handleCreateUpdateResponse({
        payload: responseObj,
        fields: cartItemFormData?.getForm?.fields,
        edit: false,
      });
      if (!cartItemResponse?._id) {
        throw new Error();
      }
      if (cartFormResponses?.getResponses?.data[0]?._id) {
        const cartResponse = await handleCreateUpdateResponse({
          payload: {
            formId: action.addToCartConfig.cartForm?._id,
            values: [
              ...cartFormResponses?.getResponses?.data[0]?.values,

              {
                field: action.addToCartConfig.cartFormItemsFieldId,
                value: '',
                response: cartItemResponse?._id,
              },
            ],
          },
          fields: cartItemFormData?.getForm?.fields,
          edit: true,
        });
      } else {
        const cartResponse = await handleCreateUpdateResponse({
          payload: {
            formId: action.addToCartConfig.cartForm?._id,
            values: [
              {
                field: action.addToCartConfig.cartFormItemsFieldId,
                value: '',
                response: cartItemResponse?._id,
              },
              {
                field: action.addToCartConfig.cartFormStatusFieldId,
                value: DEFAULT_CART_STATUS,
              },
            ],
          },
          fields: cartFormData?.getForm?.fields,
          edit: false,
        });
      }

      alert('Added to Cart');
    } catch (error) {
      alert(`AddToCart Error, ${error?.message}`);
    }
    //
  };

  return { handleOnClick, alreadyInCart };
};
