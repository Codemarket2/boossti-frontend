import { useMutation } from '@apollo/client';
import { CREATE_FORM } from '../../graphql/mutation/form';
import { IHooksProps } from '../../types/common';

export function useCreateForm({ onAlert }: IHooksProps) {
  const [createMutation, { loading: createLoading }] = useMutation(CREATE_FORM);

  const handleCreateForm = async (name: string) => {
    const payload = { name, fields: [] };
    try {
      const res = await createMutation({
        variables: payload,
      });
      return res;
    } catch (error) {
      console.log(error);
      onAlert('Error', error.message);
      return error;
    }
  };
  return { handleCreateForm, createLoading };
}
