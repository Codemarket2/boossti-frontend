import { useGetForm } from '@frontend/shared/hooks/form';
import FormView from './FormView';
import ErrorLoading from '../common/ErrorLoading';
import NotFound from '../common/NotFound';

interface IProps {
  formId: string;
  parentId?: string;
  createCallback?: (response: any) => void;
  customSettings?: any;
  isPageOwner?: boolean;
  layouts?: any;
}

export default function FormViewWrapper({
  formId,
  parentId,
  createCallback,
  customSettings,
  isPageOwner,
  layouts,
}: IProps): any {
  const { error, data } = useGetForm(formId);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getForm) {
    return <NotFound />;
  }

  return (
    <FormView
      form={{ ...data.getForm, settings: customSettings || data.getForm?.settings }}
      parentId={parentId}
      createCallback={createCallback}
      isPageOwner={isPageOwner}
      layouts={layouts}
    />
  );
}
