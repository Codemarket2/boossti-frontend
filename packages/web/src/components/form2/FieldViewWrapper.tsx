import { useGetForm } from '@frontend/shared/hooks/form';
import FormView from './FormView';
import ErrorLoading from '../common/ErrorLoading';

export default function FieldViewWrapper({ _id }): any {
  const { error, data } = useGetForm(_id);

  if (error || !data || !data.getForm) {
    return <ErrorLoading error={error} />;
  }
  return (
    <div>
      <FormView form={data.getForm} />
    </div>
  );
}
