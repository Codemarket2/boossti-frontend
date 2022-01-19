import { useMutation } from '@apollo/client';
import { GET_FIELDS } from '../../graphql/query/field';
import { DELETE_FIELD } from '../../graphql/mutation/field';
import { IHooksProps } from '../../types/common';

interface IProps extends IHooksProps {
  parentId: string;
}

export function useDeleteField({ onAlert, parentId }: IProps) {
  const [deleteFieldMutation, { loading: deleteLoading }] = useMutation(DELETE_FIELD);
  const handleDelete = async (_id: string, relationId: string = null, deleteCallBack: any) => {
    try {
      const deleteInCache = (client) => {
        const oldData = client.readQuery({
          query: GET_FIELDS,
          variables: { parentId },
        });
        let getFields = [];
        if (oldData?.getFields) {
          getFields = oldData?.getFields;
        }
        const newData = {
          getFields: getFields.filter((f) => f._id !== _id),
        };
        client.writeQuery({
          query: GET_FIELDS,
          variables: { parentId },
          data: newData,
        });
      };
      if (relationId) {
        await deleteFieldMutation({
          variables: { _id: relationId },
          //   update: deleteInCache,
        });
      }
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
