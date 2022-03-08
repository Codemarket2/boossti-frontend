import { useMutation } from '@apollo/client';
import { UPDATE_RESPONSE_PARENTID } from '../../graphql/mutation/response';
import { IHooksProps } from '../../types/common';
import { omitTypename } from '../../utils/omitTypename';

export function useCreateUpdateResponseParent({ onAlert }: IHooksProps, parentId) {
  const [updateParentMutation, { loading: updateParentLoading }] = useMutation(
    UPDATE_RESPONSE_PARENTID,
  );

  const handleCreateUpdateResponseParent = async (tPayload) => {
    try {
      let payload = { ...tPayload };
      payload = {
        ...payload,
        parentId: [parentId],
      };
      let response = null;

      response = await updateParentMutation({ variables: payload });

      response = response?.data?.updateParentResponse;

      return response;
    } catch (error) {
      console.log(error);
      onAlert('Error', error.message);
    }
  };
  return { handleCreateUpdateResponseParent, updateParentLoading };
}
