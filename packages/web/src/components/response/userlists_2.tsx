import TablePagination from '@mui/material/TablePagination';
import { useGetResponses, useDeleteResponse } from '@frontend/shared/hooks/response';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';
import { DisplayResponse } from './DisplayResponse';
import Table2 from './Table2';
import Table from './table_2';
import { ResponseViewSelectInput } from '../form2/FormSetting';

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface IResponseList {
  form: any;
  workflowId?: string;
  showOnlyMyResponses?: boolean;
  isTemplateInstance?: string;
  valueFilter?: any;
  onClickResponse?: (response, form) => void;
  parentResponseId?: string;
}

export default function ResponseList({
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

  // function handleDelete(
  //   responseId: string,
  //   _refetch: (
  //     variables?: Partial<{
  //       formId: string;
  //       appId: string;
  //       parentResponseId: string;
  //       workflowId: string;
  //       page: number;
  //       limit: number;
  //       search: string;
  //       formField: string;
  //       onlyMy: boolean;
  //       valueFilter: any;
  //     }>,
  //   ) => Promise<
  //     import('@apollo/client').ApolloQueryResult<{
  //       getResponses: { data: import('@frontend/shared/types').IResponse[]; count: number };
  //     }>
  //   >,
  // ): any {
  //   throw new Error('Function not implemented.');
  // }

  //   const handleDelete = async (responseId) => {
  //     try {
  //       // Your deletion logic here using deleteResponse function
  //       const deletionSuccessful = await useDeleteResponse(responseId);

  //       if (deletionSuccessful) {
  //         // Only refetch if deletion is successful
  //         refetch();
  //       }
  //     } catch (error) {
  //       // Handle error appropriately
  //       onAlert('Error deleting response', 'error');
  //     }
  //   };

  // const  responses={data?.getResponses?.data.filter(response => response.createdBy === 'Unauthenticated')}
  //   console.log('data', data);

  return (
    <>
      {' '}
      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        <div key="table" data-grid={{ x: 0, y: 0, w: 12, h: 10 }}>
          <Table
            search={state.search}
            onSearchChange={(search) => setState({ ...state, search })}
            form={form}
            loading={loading}
            count={data?.getResponses?.count}
            responses={data?.getResponses?.data}
            // eslint-disable-next-line no-return-await
            onDelete={async (responseId) => await handleDelete(responseId, refetch)}
            error={error}
            isTemplateInstance={isTemplateInstance}
            page={state.page}
            limit={state.limit}
            onPageChange={(page) => setState({ ...state, page })}
            onLimitChange={(limit) => setState({ ...state, limit })}
            onClickResponse={onClickResponse}
          />
        </div>
      </ResponsiveGridLayout>
    </>
    // <div>
    //   <p>hey hii</p>
    // </div>
  );
}
