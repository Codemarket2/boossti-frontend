import React from 'react';
import Backdrop from '../common/Backdrop';
import { useGetResponses } from '@frontend/shared/hooks/response';

export interface IResponseList {
  form: any;
  workflowId?: string;
  showOnlyMyResponses?: boolean;
  isTemplateInstance?: string;
  valueFilter?: any;
  onClickResponse?: (response, form) => void;
  parentResponseId?: string;
}

const useResponseList = ({
  form,
  workflowId,
  showOnlyMyResponses,
  isTemplateInstance,
  valueFilter,
  onClickResponse,
  parentResponseId,
}: IResponseList) => {
  const { data, error, loading, state, setState, refetch } = useGetResponses({
    formId: form?._id,
    onlyMy: showOnlyMyResponses,
    workflowId,
    valueFilter,
    parentResponseId,
  });
  console.log(form);
  return [loading, error, data];
};

export default useResponseList;
