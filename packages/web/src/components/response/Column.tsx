import TablePagination from '@mui/material/TablePagination';
import { useGetResponses, useDeleteResponse } from '@frontend/shared/hooks/response';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';
import { DisplayResponse } from './DisplayResponse';
import Table2 from './Table2';
import CreatedbyCol from './createdbycol';
import { ResponseViewSelectInput } from '../form2/FormSetting';

export interface IResponseList {
  form: any;
  workflowId?: string;
  showOnlyMyResponses?: boolean;
  isTemplateInstance?: string;
  valueFilter?: any;
  onClickResponse?: (response, form) => void;
  parentResponseId?: string;
}

export default function Column({
  form,
  workflowId,
  showOnlyMyResponses,
  isTemplateInstance,
  valueFilter,
  onClickResponse,
  parentResponseId,
}: IResponseList): any {
  const { data, error, loading, state, setState, refetch } = useGetResponses({
    formId: form?._id,
    onlyMy: showOnlyMyResponses,
    workflowId,
    valueFilter,
    parentResponseId,
  });
  const [responsesView, setResponsesView] = useState(form?.settings?.responsesView || 'table');

  const { handleDelete, deleteLoading } = useDeleteResponse({ onAlert });

  return (
    <>
      <>
        <CreatedbyCol
          search={state.search}
          onSearchChange={(search) => setState({ ...state, search })}
          form={form}
          loading={loading}
          count={data?.getResponses?.count}
          responses={data?.getResponses?.data}
          onDelete={(responseId) => handleDelete(responseId, refetch)}
          error={error}
          isTemplateInstance={isTemplateInstance}
          page={state.page}
          limit={state.limit}
          onPageChange={(page) => setState({ ...state, page })}
          onLimitChange={(limit) => setState({ ...state, limit })}
          onClickResponse={onClickResponse}
        />
      </>
    </>
  );
}
