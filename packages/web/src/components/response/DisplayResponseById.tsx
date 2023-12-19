import { useGetForm } from '@frontend/shared/hooks/form';
import { useGetResponse } from '@frontend/shared/hooks/response';
import { IResponse } from '@frontend/shared/types/response';
import ResponsiveGridLayout, { WidthProvider, Responsive } from 'react-grid-layout';
import NotFound from '../common/NotFound';
import ErrorLoading from '../common/ErrorLoading';
import { DisplayResponse } from './DisplayResponse';

const initialState = {
  layouts: {},
  styles: {},
  selectedField: null,
  selectedElement: null,
  layoutEdit: true,
  editMode: false,
};

const layout = [
  { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
  { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  { i: 'c', x: 4, y: 0, w: 1, h: 2 },
];
const ResponsiveReactGridLayout = WidthProvider(Responsive);
interface DisplayResponseByIdProps {
  responseId: string;
  hideBreadcrumbs?: boolean;
  hideNavigation?: boolean;
  hideAuthor?: boolean;
  hideWorkflow?: boolean;
  deleteCallBack?: () => void;
  hideDelete?: boolean;
  previewMode?: boolean;
  viewLess?: boolean;
  handleViewLess?: (vieMore: boolean) => void;
}

export default function DisplayResponseById({
  responseId,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
  hideWorkflow,
  hideDelete,
  deleteCallBack,
  previewMode,
  viewLess,
  handleViewLess,
}: DisplayResponseByIdProps) {
  const { data, error } = useGetResponse(responseId);

  if (error || !data?.getResponse) {
    return <ErrorLoading error={error} />;
  }

  // if (!data?.getResponse) {
  //   return <NotFound />;
  // }

  return (
    <DisplayResponseWithFormId
      response={data?.getResponse}
      formId={data?.getResponse?.formId}
      hideBreadcrumbs={hideBreadcrumbs}
      hideNavigation={hideNavigation}
      hideAuthor={hideAuthor}
      hideWorkflow={hideWorkflow}
      deleteCallBack={deleteCallBack}
      hideDelete={hideDelete}
      previewMode={previewMode}
      viewLess={viewLess}
      handleViewLess={handleViewLess}
    />
  );
}

interface DisplayResponseWithFormIdProps {
  formId: string;
  response: IResponse;
  hideBreadcrumbs?: boolean;
  hideNavigation?: boolean;
  hideAuthor?: boolean;
  hideWorkflow?: boolean;
  deleteCallBack?: () => void;
  hideDelete?: boolean;
  previewMode?: boolean;
  viewLess?: boolean;
  handleViewLess?: (vieMore: boolean) => void;
}

export function DisplayResponseWithFormId({
  formId,
  response,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
  hideWorkflow,
  deleteCallBack,
  hideDelete,
  previewMode,
  viewLess,
  handleViewLess,
}: DisplayResponseWithFormIdProps) {
  const { data, error, loading } = useGetForm(formId);

  if (error || !data || loading) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getForm) {
    return <NotFound />;
  }

  return (
    <DisplayResponse
      response={response}
      form={data?.getForm}
      hideBreadcrumbs={hideBreadcrumbs}
      hideNavigation={hideNavigation}
      hideAuthor={hideAuthor}
      hideWorkflow={hideWorkflow}
      deleteCallBack={deleteCallBack}
      hideDelete={hideDelete}
      previewMode={previewMode}
      viewLess={viewLess}
      handleViewLess={handleViewLess}
    />
  );
}
