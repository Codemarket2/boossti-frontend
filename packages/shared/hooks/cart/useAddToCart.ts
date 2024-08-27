import { useEffect } from 'react';
import { useGetFormBySlug } from '../form';
import { useCreateUpdateResponse, useGetResponses } from '../response';

export const useAddToCart = (productId: string, quantity: number) => {
  const { handleCreateUpdateResponse } = useCreateUpdateResponse({
    onAlert: () => {},
    workflowId: null,
    parentResponseId: null,
  });

  const { data } = useGetFormBySlug('cartitems');

  const { data: getResponsesData, setState } = useGetResponses({
    formId: data?.getFormBySlug?._id,
    valueFilter: {},
  });

  useEffect(() => {
    if (data?.getFormBySlug?._id) {
      const productField = data?.getFormBySlug?.fields?.find(
        (field) => field.label?.toLowerCase() === 'product',
      );
      const valueFilter = {
        'values.field': productField?._id,
        'values.response': productId,
      };
      setState((oldSTate) => ({ ...oldSTate, valueFilter: JSON.stringify(valueFilter) }));
    }
  }, [data]);

  useEffect(() => {
    if (getResponsesData) {
      //   debugger;
    }
  }, [getResponsesData]);

  const getResponseObject = () => {
    if (!data?.getFormBySlug?._id) {
      throw new Error('cartitems form not found');
    }
    const productField = data?.getFormBySlug?.fields?.find(
      (field) => field.label?.toLowerCase() === 'product',
    );
    const quantityField = data?.getFormBySlug?.fields?.find(
      (field) => field.label?.toLowerCase() === 'quantity',
    );

    if (!productField?._id || !quantityField?._id) {
      throw new Error('product, quantity field not found in cartitems');
    }

    const response = {
      formId: data?.getFormBySlug?._id,
      values: [
        { field: productField?._id, value: '', response: productId },
        { field: quantityField?._id, value: '', valueNumber: quantity },
      ],
    };

    return response;
  };

  const addToCart = async () => {
    try {
      const responseObj = getResponseObject();
      const response = await handleCreateUpdateResponse({
        payload: responseObj,
        fields: data?.getFormBySlug?.fields,
        edit: false,
      });
    } catch (error) {
      console.log(`AddToCart Error, ${error?.message}`);
      alert(`AddToCart Error, ${error?.message}`);
    }
    //
  };

  return { addToCart };
};
