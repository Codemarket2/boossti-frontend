import { useGetFieldValue, useUpdateFieldValue } from '@frontend/shared/hooks/field';
import ErrorLoading from '../common/ErrorLoading';
import DisplayContentBox from './DisplayContentBox';

export default function FieldContentBox({ _id }: any) {
  const { data, error, loading } = useGetFieldValue(_id);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  return <DisplayContentBox value={data.getFieldValue.value} />;
}
