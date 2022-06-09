import { useGetForm } from '@frontend/shared/hooks/form';
import FormView from './FormView';
import ErrorLoading from '../common/ErrorLoading';
import NotFound from '../common/NotFound';

interface IProps {
  formId: string;
  workFlowFormReponseParentId?: string;
  createCallback?: (response: any) => void;
  customSettings?: any;
  isPageOwner?: boolean;
  layouts?: any;
  templateInstanceId?: string;
}

export default function FormViewWrapper({
  formId,
  workFlowFormReponseParentId,
  createCallback,
  customSettings,
  isPageOwner,
  layouts,
  templateInstanceId,
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
      workFlowFormReponseParentId={workFlowFormReponseParentId}
      createCallback={createCallback}
      isPageOwner={isPageOwner}
      templateInstanceId={templateInstanceId}
    />
  );
}
