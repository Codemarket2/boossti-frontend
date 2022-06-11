import { useMutation } from '@apollo/client';
import { CREATE_RESPONSE, UPDATE_RESPONSE } from '../../graphql/mutation/response';
import { IHooksProps } from '../../types/common';
import { omitTypename } from '../../utils/omitTypename';
import { stringifyValues } from '../section/updateSection';

interface IProps extends IHooksProps {
  workFlowFormResponseParentId?: string;
  templateId?: string;
  templateDefaultWidgetResponseId?: string;
}

export function useCreateUpdateResponse({
  onAlert,
  workFlowFormResponseParentId,
  templateId,
  templateDefaultWidgetResponseId,
}: IProps) {
  const [createMutation, { loading: createLoading }] = useMutation(CREATE_RESPONSE);
  const [updateMutation, { loading: updateLoading }] = useMutation(UPDATE_RESPONSE);

  const handleCreateUpdateResponse = async ({
    payload: tPayload,
    edit = false,
  }: {
    payload: any;
    edit?: boolean;
  }) => {
    try {
      let payload = { ...tPayload };
      const values = stringifyValues(payload.values, true);
      payload = {
        ...payload,
        values: values.map((m) => JSON.parse(JSON.stringify(m), omitTypename)),
        workFlowFormResponseParentId,
        templateId,
        templateDefaultWidgetResponseId,
      };
      let response = null;
      if (edit) {
        response = await updateMutation({
          variables: payload,
        });
        response = response?.data?.updateResponse;
      } else {
        response = await createMutation({
          variables: payload,
        });
        response = response?.data?.createResponse;
      }

      return response;
    } catch (error) {
      // console.log(error);
      onAlert('Error', error.message);
    }
  };
  return { handleCreateUpdateResponse, createLoading, updateLoading };
}
