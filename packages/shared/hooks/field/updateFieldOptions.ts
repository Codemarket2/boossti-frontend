import { useMutation } from '@apollo/client';
import { GET_FIELDS } from '../../graphql/query/field';
import { UPDATE_FIELD_OPTIONS } from '../../graphql/mutation/field';
import { IHooksProps } from '../../types/common';

interface IProps extends IHooksProps {
  parentId: string;
}

export const useUpdateFieldOptions = ({ onAlert, parentId }: IProps) => {
  const [updateMutation, { loading: updateOptionsLoading }] = useMutation(UPDATE_FIELD_OPTIONS);

  const handleUpdateFieldOptions = async (_id, options) => {
    try {
      const updateCache = (client, mutationResult) => {
        const oldData = client.readQuery({
          query: GET_FIELDS,
          variables: { parentId },
        });
        let getFields = [];
        if (oldData?.getFields) {
          getFields = oldData?.getFields;
        }
        getFields = getFields?.map((f) =>
          f._id === mutationResult.data.updateField._id
            ? { ...f, ...mutationResult.data.updateField }
            : f,
        );
        client.writeQuery({
          query: GET_FIELDS,
          variables: { parentId },
          data: { getFields },
        });
      };

      await updateMutation({
        variables: { _id, options },
        update: updateCache,
      });
    } catch (error) {
      onAlert(`Error form`, error.message);
    }
  };
  return { handleUpdateFieldOptions, updateOptionsLoading };
};
