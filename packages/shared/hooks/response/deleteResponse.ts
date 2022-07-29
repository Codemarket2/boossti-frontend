import { useMutation } from '@apollo/client';
import { DELETE_RESPONSE } from '../../graphql/mutation/response';
import { IHooksProps } from '../../types/common';

interface IDeleteProps extends IHooksProps {
  _id?: string;
}

export function useDeleteResponse({ onAlert }: IDeleteProps) {
  const [deleteMutation, { loading: deleteLoading }] = useMutation<
    { deleteResponse: string },
    { _id: string }
  >(DELETE_RESPONSE);
  const handleDelete = async (_id: string, deleteCallBack?: any) => {
    try {
      await deleteMutation({
        variables: { _id },
      });
      if (deleteCallBack) {
        deleteCallBack();
      }
    } catch (error) {
      onAlert('Error delete', error.message);
    }
  };

  return { handleDelete, deleteLoading };
}
