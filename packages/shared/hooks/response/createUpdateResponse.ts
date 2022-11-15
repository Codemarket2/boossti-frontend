import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { CREATE_RESPONSE, UPDATE_RESPONSE } from '../../graphql/mutation/response';
import { IResponse } from '../../types';
import { IHooksProps } from '../../types/common';
import { omitTypename } from '../../utils/omitTypename';
import { stringifyValues } from '../section/updateSection';
import { calculateSystemValues } from './calculateSystemValues';

interface IProps extends IHooksProps {
  parentResponseId?: string;
  workflowId?: string;
}

export function useCreateUpdateResponse({ onAlert, workflowId, parentResponseId }: IProps) {
  const setting = useSelector((state: any) => state?.setting);
  const [createMutation, { loading: createLoading }] = useMutation<
    { createResponse: IResponse },
    IResponse
  >(CREATE_RESPONSE);
  const [updateMutation, { loading: updateLoading }] = useMutation<
    { updateResponse: IResponse },
    IResponse
  >(UPDATE_RESPONSE);
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
      });
      payload = {
        ...payload,
        values: stringifyValues(payload.values, true).map((m) =>
          JSON.parse(JSON.stringify(m), omitTypename),
        ),
        appId: setting?.appResponse?._id,
        workflowId,
        parentResponseId,
      };
      let response;
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

export const defaultValueObject = {
  // _id: '',
  field: '',
  value: '',
  valueNumber: null,
  valueBoolean: null,
  valueDate: null,
  media: [],
  values: [],
  template: null,
  page: null,
  form: null,
  response: null,
  options: { option: false },
};
