import { useMutation } from '@apollo/client';
import { CREATE_RESPONSE, UPDATE_RESPONSE } from '../../graphql/mutation/response';
import { IHooksProps } from '../../types/common';
import { omitTypename } from '../../utils/omitTypename';
import { fileUpload } from '../../utils/fileUpload';

export function useCreateUpdateResponse({ onAlert }: IHooksProps, parentId) {
  const [createMutation, { loading: createLoading }] = useMutation(CREATE_RESPONSE);
  const [updateMutation, { loading: updateLoading }] = useMutation(UPDATE_RESPONSE);

  const handleCreateUpdateResponse = async (tPayload, fields, edit = false) => {
    try {
      let payload = { ...tPayload };
      const values = [];
      for (let i = 0; i < payload.values.length; i += 1) {
        let value = payload.values[i];
        const field = fields?.filter((f) => f._id === value.field)[0];
        if (field.fieldType === 'type' || value?.itemId?._id) {
          value = { ...value, itemId: value?.itemId?._id ? value?.itemId?._id : null };
        }
        if (field.fieldType === 'existingForm' || value?.response?._id) {
          value = { ...value, response: value?.response?._id ? value?.response?._id : null };
        }
        if (field.fieldType === 'image' && value?.tempMedia?.length > 0) {
          let newMedia = [];
          if (value.tempMediaFiles.length > 0) {
            // eslint-disable-next-line no-await-in-loop
            newMedia = await fileUpload(value.tempMediaFiles, '/form-response');
          }
          if (newMedia?.length > 0) {
            newMedia = newMedia.map((n, i) => ({ url: n, caption: value?.tempMedia[i].caption }));
            value.media = newMedia;
          }
        }
        const { tempMedia, tempMediaFiles, ...finalValue } = value;
        values.push(finalValue);
      }
      payload = {
        ...payload,
        parentId,
        values: values.map((m) => JSON.parse(JSON.stringify(m), omitTypename)),
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
