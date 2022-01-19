import { useMutation } from '@apollo/client';
import { GET_FIELDS } from '../../graphql/query/field';
import { client as apolloClient } from '../../graphql';
import { UPDATE_FIELD_POSITION } from '../../graphql/mutation/field';
import { IHooksProps } from '../../types/common';

interface IProps extends IHooksProps {
  parentId: string;
}

export function useUpdateFieldPosition({ onAlert, parentId }: IProps) {
  const [updateFieldPositionMutation, { loading: updateLoading }] = useMutation(
    UPDATE_FIELD_POSITION,
  );
  const updatePositionInCache = async (newFields) => {
    const { getFields } = await apolloClient.readQuery({
      query: GET_FIELDS,
      variables: { parentId },
    });
    const newData = {
      getFields: {
        ...getFields,
        data: newFields,
      },
    };
    apolloClient.writeQuery({
      query: GET_FIELDS,
      variables: { parentId },
      data: newData,
    });
  };

  const handleUpdatePosition = async (_id: any, position: number) => {
    try {
      await updateFieldPositionMutation({
        variables: { _id, position },
      });
    } catch (error) {
      onAlert('Error', error.message);
    }
  };

  return { handleUpdatePosition, updateLoading, updatePositionInCache };
}
