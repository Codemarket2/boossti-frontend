import { useGetForm } from '@frontend/shared/hooks/form';
import { useGetResponse } from '@frontend/shared/hooks/response';
import NotFound from '../common/NotFound';
import ErrorLoading from '../common/ErrorLoading';
import { DisplayResponse } from './DisplayResponse';

interface IProps {
  responseId: string;
  hideBreadcrumbs?: boolean;
  hideNavigation?: boolean;
  hideAuthor?: boolean;
  hideWorkflow?: boolean;
  deleteCallBack?: () => void;
}

export default function Response({
  responseId,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
  hideWorkflow,
  deleteCallBack,
}: IProps) {
  const { data, error } = useGetResponse(responseId);

  if (error || !data?.getResponse) {
    return <ErrorLoading error={error} />;
  }

  // if (!data?.getResponse) {
  //   return <NotFound />;
  // }

  return (
    <ResponseChild2
      response={data?.getResponse}
      formId={data?.getResponse?.formId}
      hideBreadcrumbs={hideBreadcrumbs}
      hideNavigation={hideNavigation}
      hideAuthor={hideAuthor}
      hideWorkflow={hideWorkflow}
      deleteCallBack={deleteCallBack}
    />
  );
}

interface IProps2 {
  formId: any;
  response: any;
  hideBreadcrumbs?: boolean;
  hideNavigation?: boolean;
  hideAuthor?: boolean;
  hideWorkflow?: boolean;
  isAuthorized?: boolean;
  deleteCallBack?: () => void;
}

export function ResponseChild2({
  formId,
  response,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
  hideWorkflow,
  isAuthorized,
  deleteCallBack,
}: IProps2) {
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
      isAuthorized={isAuthorized}
      deleteCallBack={deleteCallBack}
    />
  );
}
