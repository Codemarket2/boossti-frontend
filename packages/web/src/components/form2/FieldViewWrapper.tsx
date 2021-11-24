import { useGetForm } from '@frontend/shared/hooks/form';
import FormView from './FormView';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  _id: string;
}

export default function FieldViewWrapper({ _id }: IProps): any {
  const { error, data } = useGetForm(_id);

  if (error || !data || !data.getForm) {
    return <ErrorLoading error={error} />;
  }
  return <FormView form={data.getForm} />;
}
