import { useGetForm } from '@frontend/shared/hooks/form';
import FormView from './FormView';
import ErrorLoading from '../common/ErrorLoading';
import NotFound from '../common/NotFound';

interface IProps {
  formId: string;
  workFlowFormResponseParentId?: string;
  createCallback?: (response: any) => void;
  customSettings?: any;
  isPageOwner?: boolean;
  layouts?: any;
  templateDefaultWidgetResponseId?: string;
}

export default function FormViewWrapper({
  formId,
  workFlowFormResponseParentId,
  createCallback,
  customSettings,
  isPageOwner,
  layouts,
  templateDefaultWidgetResponseId,
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
      workFlowFormResponseParentId={workFlowFormResponseParentId}
      createCallback={createCallback}
      isPageOwner={isPageOwner}
      templateDefaultWidgetResponseId={templateDefaultWidgetResponseId}
    />
  );
}
