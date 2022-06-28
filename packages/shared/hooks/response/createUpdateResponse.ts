import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { CREATE_RESPONSE, UPDATE_RESPONSE } from '../../graphql/mutation/response';
import { IHooksProps } from '../../types/common';
import { omitTypename } from '../../utils/omitTypename';
import { stringifyValues } from '../section/updateSection';
import { calculateSystemValues, ISystemValues } from './calculateSystemValues';

interface IProps extends IHooksProps {
  workFlowFormResponseParentId?: string;
  templateId?: string;
  templateDefaultWidgetResponseId?: string;
  systemValues?: ISystemValues;
}

export function useCreateUpdateResponse({
  onAlert,
  workFlowFormResponseParentId,
  templateId,
  templateDefaultWidgetResponseId,
  systemValues,
}: IProps) {
  const [createMutation, { loading: createLoading }] = useMutation(CREATE_RESPONSE);
  const [updateMutation, { loading: updateLoading }] = useMutation(UPDATE_RESPONSE);
  const globalState = useSelector((state) => state);
  const handleCreateUpdateResponse = async ({
    payload: tPayload,
    edit = false,
    fields = [],
  }: {
    payload: any;
    edit?: boolean;
    fields?: any[];
  }) => {
    try {
      let payload = { ...tPayload };
      payload.values = calculateSystemValues({
        values: payload?.values,
        fields,
        globalState,
        systemValues,
      });
      payload = {
        ...payload,
        values: stringifyValues(payload.values, true).map((m) =>
          JSON.parse(JSON.stringify(m), omitTypename),
        ),
        templates: stringifyTemplates(payload?.templates),
        workFlowFormResponseParentId,
        // templateId,
        templateDefaultWidgetResponseId,
      };
      let response;
      if (edit) {
        if (templateId) {
          payload = { ...payload, newTemplates: [{ template: templateId }] };
        }
        response = await updateMutation({
          variables: payload,
        });
        response = response?.data?.updateResponse;
      } else {
        if (templateId) {
          payload = { ...payload, templates: [{ template: templateId }] };
        }
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

const stringifyTemplates = (templates) => {
  const newTemplates = templates?.map((template) => ({
    _id: template?._id,
    template: template?.template?._id,
    user: template?.user?._id,
    createdAt: template?.createdAt,
  }));
  return newTemplates || [];
};
