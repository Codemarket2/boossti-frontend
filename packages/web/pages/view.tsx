import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import { useGetResponses, useGetResponse } from '@frontend/shared/hooks/response';
import Form from '../src/components/form2/Form';
import ResponseList, { IResponseList } from '../src/components/response/ResponseList';

export default function view() {
  const { data, error } = useGetFormBySlug('pages');
  return <GetResponseValue formData={data?.getFormBySlug} />;
}

export function GetResponseValue({ formData }: any) {
  const { data, error } = useGetResponses({ formId: formData?._id });
  return (
    <>
      <ResponseList form={formData} />
      <p>{JSON.stringify(data?.getResponses?.data[1].values[1].value)}</p>
    </>
  );
}
