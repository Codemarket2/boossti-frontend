import { useMutation } from '@apollo/client';
import { IHooksProps } from '../../types/common';
import { GET_FIELD_VALUES } from '../../graphql/query/field';
import { DELETE_FIELD_VALUE } from '../../graphql/mutation/field';
import { defaultQueryVariables } from './getFieldValues';

interface IProps extends IHooksProps {
  parentId: string;
  field: string;
  state?: any;
}

export function useDeleteFieldValue({ onAlert, parentId, field }: IProps) {
  const [deleteFieldMutation, { loading: deleteLoading }] = useMutation(DELETE_FIELD_VALUE);
  const queryVariables = { ...defaultQueryVariables, parentId, field };
  const handleDelete = async (_id: any, relationId: any, deleteCallBack: any) => {
    try {
      const deleteInCache = (client) => {
        const oldData = client.readQuery({
          query: GET_FIELD_VALUES,
          variables: queryVariables,
        });
        let getFieldValues = { data: [], count: 0 };
        if (oldData?.getFieldValues) {
          getFieldValues = { ...oldData?.getFieldValues };
        }
        const newData = {
          getFieldValues: {
            ...getFieldValues,
            data: getFieldValues.data.filter((f) => f._id !== _id),
          },
        };
        client.writeQuery({
          query: GET_FIELD_VALUES,
          variables: queryVariables,
          data: newData,
        });
      };
      if (relationId) {
        await deleteFieldMutation({
          variables: { _id: relationId },
        });
      }
      await deleteFieldMutation({
        variables: { _id },
        update: deleteInCache,
      });
      deleteCallBack();
    } catch (error) {
      onAlert('Error', error.message);
    }
  };

  return { handleDelete, deleteLoading };
}
