import { useMutation } from '@apollo/client';
import { CREATE_RESPONSE } from '../../graphql/mutation/response';
import { IHooksProps } from '../../types/common';
import { omitTypename } from '../../utils/omitTypename';

export function useCreateResponse({ onAlert }: IHooksProps): any {
  const [createMutation, { loading: createLoading }] = useMutation(CREATE_RESPONSE);

  const handleCreateResponse = async (tPayload, fields) => {
    try {
      let payload = { ...tPayload };
      payload = {
        ...payload,
        values: payload.values.map((m) => JSON.parse(JSON.stringify(m), omitTypename)),
      };
      payload = {
        ...payload,
        values: payload.values.map((m) => {
          const value = { ...m };
          const field = fields?.filter((f) => f._id === value.field)[0];
          if (field.fieldType === 'type') {
            value.itemId = value.itemId ? value.itemId._id : null;
          }
          return value;
        }),
      };

      console.log('payload', payload);
      const res = await createMutation({
        variables: payload,
      });
      console.log('update res', res);
    } catch (error) {
      console.log(error);
      onAlert('Error', error.message);
    }
  };
  return { handleCreateResponse, createLoading };
}
