import { useMutation } from '@apollo/client';
import { DELETE_RESPONSE } from '../../graphql/mutation/response';
import { IHooksProps } from '../../types/common';
// import { GET_RESPONSES } from '../../graphql/query/response';
// import { defaultQueryVariables } from './getResponse';

interface IDeleteProps extends IHooksProps {
  _id?: string;
  templateId?: string;
}

export function useDeleteResponse({ onAlert, templateId }: IDeleteProps) {
  const [deleteMutation, { loading: deleteLoading }] = useMutation(DELETE_RESPONSE);
  const handleDelete = async (_id: string, deleteCallBack?: any) => {
    try {
      // const deleteInCache = (client) => {
      //   const oldData = client.readQuery({
      //     query: GET_RESPONSES,
      //     variables: { ...defaultQueryVariables, ...variables, formId },
      //   });
      //   if (oldData?.getResponses) {
      //     const newData = {
      //       getResponses: {
      //         ...oldData?.getResponses,
      //         data: oldData?.getResponses.data.filter((f) => f._id !== _id),
      //       },
      //     };
      //     client.writeQuery({
      //       query: GET_RESPONSES,
      //       variables: { ...defaultQueryVariables, ...variables, formId },
      //       data: newData,
      //     });
      //   }
      // };
      await deleteMutation({
        variables: { _id, templateId },
        // update: deleteInCache,
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
