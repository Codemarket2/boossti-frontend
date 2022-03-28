import { useMutation } from '@apollo/client';
import { CREATE_RESPONSE, UPDATE_RESPONSE } from '../../graphql/mutation/response';
import { IHooksProps } from '../../types/common';
import { omitTypename } from '../../utils/omitTypename';
import { stringifyValues } from '../section/updateSection';

export function useCreateUpdateResponse(
  { onAlert }: IHooksProps,
  parentId,
  workFlowFormReponseParentId?: string,
) {
  const [createMutation, { loading: createLoading }] = useMutation(CREATE_RESPONSE);
  const [updateMutation, { loading: updateLoading }] = useMutation(UPDATE_RESPONSE);

  const handleCreateUpdateResponse = async (tPayload, fields, edit = false) => {
    try {
      let payload = { ...tPayload };
      const values = stringifyValues(payload.values, true);
      payload = {
        ...payload,
        values: values.map((m) => JSON.parse(JSON.stringify(m), omitTypename)),
        parentId,
        workFlowFormReponseParentId,
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
