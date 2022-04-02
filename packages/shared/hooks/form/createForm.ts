import { useMutation } from '@apollo/client';
import { CREATE_FORM } from '../../graphql/mutation/form';
import { IHooksProps } from '../../types/common';

export function useCreateForm({ onAlert }: IHooksProps) {
  const [createMutation, { loading: createLoading }] = useMutation(CREATE_FORM);

  const handleCreateForm = async (
    payload: { name: string; fields: any[] },
    onSuccess: (newForm: any) => void,
    onFailure?: () => void,
  ) => {
    try {
      const res = await createMutation({
        variables: payload,
      });
      if (onSuccess) {
        onSuccess(res?.data?.createForm);
      }
    } catch (error) {
      if (onFailure) {
        onFailure();
      }
      if (error.message.includes('name_1 dup key')) {
        onAlert('Error', 'Form with this name already exists');
      } else {
        onAlert('Error', error.message);
      }
    }
  };
  return { handleCreateForm, createLoading };
}

export function useCreateVirtualForm({ onAlert }: IHooksProps) {
  const [createMutation, { loading: createLoading }] = useMutation(CREATE_FORM);

  const handleCreateVirtualForm = async (name: string, tPayload) => {
    const payload = { name, ...tPayload, virtualForm: true };
    try {
      const res = await createMutation({
        variables: payload,
      });
      return res;
    } catch (error) {
      // console.log(error);
      onAlert('Error', error.message);
      return error;
    }
  };

  return { handleCreateVirtualForm, createLoading };
}
