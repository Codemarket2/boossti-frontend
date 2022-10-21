import { useGetForm } from '@frontend/shared/hooks/form';
import { useGetResponse } from '@frontend/shared/hooks/response';
import { IResponse } from '@frontend/shared/types/response';
import NotFound from '../common/NotFound';
import ErrorLoading from '../common/ErrorLoading';
import { DisplayResponse } from './DisplayResponse';

interface DisplayResponseByIdProps {
  responseId: string;
  hideBreadcrumbs?: boolean;
  hideNavigation?: boolean;
  hideAuthor?: boolean;
  hideWorkflow?: boolean;
  deleteCallBack?: () => void;
  hideDelete?: boolean;
}

export default function DisplayResponseById({
  responseId,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
  hideWorkflow,
  hideDelete,
  deleteCallBack,
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
  isAuthorized?: boolean;
  deleteCallBack?: () => void;
  hideDelete?: boolean;
}

export function DisplayResponseWithFormId({
  formId,
  response,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
  hideWorkflow,
  isAuthorized,
  deleteCallBack,
  hideDelete,
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
    />
  );
}
