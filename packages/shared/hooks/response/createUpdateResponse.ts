import { useMutation } from '@apollo/client';
import { CREATE_RESPONSE, UPDATE_RESPONSE } from '../../graphql/mutation/response';
import { IHooksProps } from '../../types/common';
import { omitTypename } from '../../utils/omitTypename';

export const getValues = (values, fields) => {
  const newValues = [];
  for (let i = 0; i < values.length; i += 1) {
    let value = values[i];
    const field = fields?.filter((f) => f._id === value.field)[0];
    if (field.fieldType === 'type' || value?.itemId?._id) {
      value = { ...value, itemId: value?.itemId?._id ? value?.itemId?._id : null };
    }
    if (field.fieldType === 'existingForm' || value?.response?._id) {
      value = { ...value, response: value?.response?._id ? value?.response?._id : null };
    }
    const { tempMedia, tempMediaFiles, ...finalValue } = value;
    newValues.push(finalValue);
  }
  return newValues;
};

export function useCreateUpdateResponse({ onAlert }: IHooksProps, parentId, responseId?: string) {
  const [createMutation, { loading: createLoading }] = useMutation(CREATE_RESPONSE);
  const [updateMutation, { loading: updateLoading }] = useMutation(UPDATE_RESPONSE);

  const handleCreateUpdateResponse = async (tPayload, fields, edit = false) => {
    try {
      let payload = { ...tPayload };
      const values = getValues(payload.values, fields);
      payload = {
        ...payload,
        values: values.map((m) => JSON.parse(JSON.stringify(m), omitTypename)),
        parentId,
        responseId,
      };
      let response = null;
      if (edit) {
        response = await updateMutation({
          variables: payload,
        });
        response = response?.data?.updateResponse;
      } else {
        response = await createMutation({
          variables: payload,
        });
        response = response?.data?.createResponse;
      }

      return response;
    } catch (error) {
      console.log(error);
      onAlert('Error', error.message);
    }
  };
  return { handleCreateUpdateResponse, createLoading, updateLoading };
}
