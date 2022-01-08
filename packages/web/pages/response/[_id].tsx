import { useRouter } from 'next/router';
import { useGetResponse } from '@frontend/shared/hooks/response';
import { useGetForm } from '@frontend/shared/hooks/form';
import Response from '../../src/components/form2/Response';
import ErrorLoading from '../../src/components/common/ErrorLoading';
import UserLayout from '../../src/components/common/UserLayout';

export default function Page() {
  const router = useRouter();
  const { _id } = router.query;
  const { data, error } = useGetResponse(_id?.toString());

  return (
    <UserLayout authRequired>
      {error || !data?.getResponse ? (
        <ErrorLoading error={error} />
      ) : (
        <Display response={data?.getResponse} />
      )}
    </UserLayout>
  );
}
function Display({ response }: any) {
  const { data: formData, error: formError } = useGetForm(response?.formId);
  if (formError || !formData?.getForm) {
    return <ErrorLoading error={formError} />;
  }
  return <Response form={formData?.getForm} response={response} />;
}
