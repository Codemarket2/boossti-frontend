import TablePagination from '@mui/material/TablePagination';
import { useGetResponses, useDeleteResponse } from '@frontend/shared/hooks/response';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';
import { ResponseChild3 } from './Response';
import Table2 from './Table2';
import Table from './Table';

interface IProps {
  form: any;
  workFlowFormResponseParentId?: string;
  showOnlyMyResponses?: boolean;
  templateId?: string;
  templateDefaultWidgetResponseId?: string;
  isTemplateInstance?: string;
  valueFilter?: any;
}

export default function ResponseList({
  form,
  workFlowFormResponseParentId,
  showOnlyMyResponses,
  templateId,
  isTemplateInstance,
  templateDefaultWidgetResponseId,
  valueFilter,
}: IProps): any {
  const { data, error, loading, state, setState, refetch, handleUpdateResponse } = useGetResponses({
    formId: form?._id,
    onlyMy: showOnlyMyResponses,
    workFlowFormResponseParentId,
    templateId,
    templateDefaultWidgetResponseId,
    valueFilter,
  });
  const { handleDelete, deleteLoading } = useDeleteResponse({ onAlert, templateId });

  return (
    <>
      <Backdrop open={deleteLoading} />
      {form?.settings?.responsesView === 'table2' ? (
        <>
          <Table2
            form={form}
            responses={data?.getResponses?.data}
            onRowChange={handleUpdateResponse}
          />
        </>
      ) : form?.settings?.responsesView === 'vertical' ? (
        <>
          {data?.getResponses?.data?.map((response) => (
            <ResponseChild3
              key={response?._id}
              hideBreadcrumbs
              form={form}
              response={response}
              deleteCallBack={() => refetch()}
            />
          ))}
          <TablePagination
            component="div"
            rowsPerPageOptions={[10, 25, 50]}
            count={data?.getResponses?.count || 0}
            rowsPerPage={state.limit}
            page={state.page - 1}
            onPageChange={(e, newPage) => setState({ ...state, page: newPage + 1 })}
            onRowsPerPageChange={(e) => setState({ ...state, limit: parseInt(e.target.value) })}
          />
        </>
      ) : (
        <>
          <Table
            search={state.search}
            onSearchChange={(search) => setState({ ...state, search })}
            form={form}
            loading={loading}
            count={data?.getResponses?.count}
            responses={data?.getResponses?.data}
            onDelete={async (responseId) => await handleDelete(responseId, refetch)}
            error={error}
            isTemplateInstance={isTemplateInstance}
            page={state.page}
            limit={state.limit}
            onPageChange={(page) => setState({ ...state, page })}
            onLimitChange={(limit) => setState({ ...state, limit })}
            templateId={templateId}
          />
        </>
      )}
    </>
  );
}
