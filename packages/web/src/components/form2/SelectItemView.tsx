import { useGetForm } from '@frontend/shared/hooks/form';
import FormView from './FormView';
import ErrorLoading from '../common/ErrorLoading';
import NotFound from '../common/NotFound';

interface IProps {
  formId: string;
  settings: any;
}

export default function SelectItemView({ formId, settings }: IProps): any {
  const { data, error, loading } = useGetForm(formId);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getForm) {
    return <NotFound />;
  }

  return <FormView form={{ ...data?.getForm, settings: { widgetType: settings.widgetType } }} />;
}
