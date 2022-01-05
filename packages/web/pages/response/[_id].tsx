import { useRouter } from 'next/router';
import { useGetResponse } from '@frontend/shared/hooks/response';
import { useGetForm } from '@frontend/shared/hooks/form';
import Response from '../../src/components/form2/Response';
import ErrorLoading from '../../src/components/common/ErrorLoading';
import UserLayout from '../../src/components/common/UserLayout';

export default function Page() {
  const router = useRouter();
  const { _id } = router.query;

  return <UserLayout authRequired>{_id && <Display responseId={_id} />}</UserLayout>;
}
function Display({ responseId }) {
  const { data, error } = useGetResponse(responseId);
  const { data: formData, error: formError } = useGetForm(data?.getResponse?.formId);
  console.log('response', data, error);
  console.log('Form ', formData, formError);
  if (error || !data || !data?.getResponse || formError || !formData) {
    return <ErrorLoading error={error} />;
  }
  return (
    <>
      <Response form={formData?.getForm} response={data?.getResponse} />
    </>
  );
}
