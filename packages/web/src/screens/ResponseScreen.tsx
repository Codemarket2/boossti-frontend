import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import { useGetResponseByCount } from '@frontend/shared/hooks/response';
import NotFound from '../components/common/NotFound';
import ErrorLoading from '../components/common/ErrorLoading';
import { DisplayResponse } from '../components/response/DisplayResponse';

interface IProps {
  slug: string;
  count: any;
  hideBreadcrumbs?: boolean;
  deleteCallback?: (form: any) => void;
}

export default function ResponseScreen({ slug, count, hideBreadcrumbs, deleteCallback }: IProps) {
  const { data, error } = useGetFormBySlug(slug);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getFormBySlug) {
    return <NotFound />;
  }

  return (
    <ResponseChild
      form={data?.getFormBySlug}
      count={count}
      hideBreadcrumbs={hideBreadcrumbs}
      deleteCallback={() => deleteCallback(data?.getFormBySlug)}
    />
  );
}

interface IProps2 {
  form: any;
  count: any;
  hideBreadcrumbs?: boolean;
  deleteCallback?: () => void;
}

export function ResponseChild({ form, count, hideBreadcrumbs, deleteCallback }: IProps2) {
  const { data, error } = useGetResponseByCount(form?._id, count);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getResponseByCount) {
    return <NotFound />;
  }

  return (
    <DisplayResponse
      response={data?.getResponseByCount}
      form={form}
      hideBreadcrumbs={hideBreadcrumbs}
      deleteCallBack={deleteCallback}
    />
  );
}
