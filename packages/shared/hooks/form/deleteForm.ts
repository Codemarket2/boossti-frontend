import { useMutation } from '@apollo/client';
import { GET_FORMS } from '../../graphql/query/form';
import { DELETE_FORM } from '../../graphql/mutation/form';
import { IHooksProps } from '../../types/common';

interface IDeleteProps extends IHooksProps {
  _id?: string;
}

export function useDeleteForm({ onAlert }: IDeleteProps) {
  const [deleteFieldMutation, { loading: deleteLoading }] = useMutation(DELETE_FORM);
  const handleDelete = async (_id: string, deleteCallBack?: any) => {
    try {
      const deleteInCache = (client) => {
        const oldData = client.readQuery({
          query: GET_FORMS,
          variables: { page: 1, limit: 20, search: '' },
        });
        if (oldData?.getForms) {
          const getForms = oldData?.getForms;
          const newData = {
            getForms: {
              ...getForms,
              data: getForms.data.filter((f) => f._id !== _id),
            },
          };
          client.writeQuery({
            query: GET_FORMS,
            variables: { page: 1, limit: 20, search: '' },
            data: newData,
          });
        }
      };
      await deleteFieldMutation({
        variables: { _id },
        update: deleteInCache,
      });
      if (deleteCallBack) {
        deleteCallBack();
      }
    } catch (error) {
      onAlert('Error', error.message);
    }
  };

  return { handleDelete, deleteLoading };
}
