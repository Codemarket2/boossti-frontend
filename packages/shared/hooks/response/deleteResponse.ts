import { useMutation } from '@apollo/client';
import { GET_RESPONSES } from '../../graphql/query/response';
import { DELETE_RESPONSE } from '../../graphql/mutation/response';
import { IHooksProps } from '../../types/common';
import { defaultQueryVariables } from './getResponse';

interface IDeleteProps extends IHooksProps {
  _id?: string;
}

export function useDeleteResponse({ onAlert }: IDeleteProps) {
  const [deleteMutation, { loading: deleteLoading }] = useMutation(DELETE_RESPONSE);
  const handleDelete = async (_id: string, formId: string, deleteCallBack?: any) => {
    try {
      const deleteInCache = (client) => {
        const oldData = client.readQuery({
          query: GET_RESPONSES,
          variables: { ...defaultQueryVariables, formId },
        });
        if (oldData?.getResponses) {
          const newData = {
            getResponses: {
              ...oldData?.getResponses,
              data: oldData?.getResponses.data.filter((f) => f._id !== _id),
            },
          };
          client.writeQuery({
            query: GET_RESPONSES,
            variables: { ...defaultQueryVariables, formId },
            data: newData,
          });
        }
      };
      await deleteMutation({
        variables: { _id },
        update: deleteInCache,
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
