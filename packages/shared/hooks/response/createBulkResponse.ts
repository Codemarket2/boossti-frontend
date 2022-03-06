import { useMutation } from '@apollo/client';
import { CREATE_BULK_RESPONSE } from '../../graphql/mutation/response';

interface IPayload {
  formId: string;
  fileUrl: string;
  map: any;
  parentId?: string;
  fileData?: any;
}
export function useCreateBulkResponse() {
  const [createBulkResponses, { loading: createLoading }] = useMutation(CREATE_BULK_RESPONSE);
  const createBulkResponseHandler = async (payload: IPayload) => {
    const { formId, fileData, fileUrl, map, parentId } = payload;
    try {
      await createBulkResponses({
        variables: { formId, fileData, fileUrl, map, parentId: [parentId] },
      });
    } catch (error) {
      console.log('Error delete', error.message);
    }
  };

  return { createBulkResponseHandler, createLoading };
}
