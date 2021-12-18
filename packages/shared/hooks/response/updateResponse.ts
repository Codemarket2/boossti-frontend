import { useMutation } from '@apollo/client';
import { UPDATE_RESPONSE } from '../../graphql/mutation/response';
import { IHooksProps } from '../../types/common';
import { omitTypename } from '../../utils/omitTypename';
import { fileUpload } from '../../utils/fileUpload';

interface IProps extends IHooksProps{
  _id:string
}

export function useUpdateResponse({ onAlert,_id }: IProps): any {
  const [updateMutation, { loading: updateLoading }] = useMutation(UPDATE_RESPONSE);

  const handleUpdateResponse = async (tPayload, fields) => {
    try {
      let payload = { ...tPayload };
      const values = [];
      for (let i = 0; i < payload.values.length; i++) {
        const value = payload.values[i];
        const field = fields?.filter((f) => f._id === value.field)[0];
        if (field.fieldType === 'type') {
          value.itemId = value.itemId ? value.itemId._id : null;
        }
        if (field.fieldType === 'image' && value?.tempMedia?.length > 0) {
          let newMedia = [];
          if (value.tempMediaFiles.length > 0) {
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
      payload = {_id,
        ...payload,
        values: values.map((m) => JSON.parse(JSON.stringify(m), omitTypename)),
      };
      console.log('payload', payload);
      const res = await updateMutation({
        variables: payload,
      });
      // console.log('update res', res);
    } catch (error) {
      console.log(error);
      onAlert('Error', error.message);
    }
  };
  return { handleUpdateResponse, updateLoading };
}
