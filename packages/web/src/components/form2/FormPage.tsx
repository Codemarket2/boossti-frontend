import { useGetForm, useGetFormBySlug } from '@frontend/shared/hooks/form';
import ErrorLoading from '../common/ErrorLoading';
import NotFound from '../common/NotFound';
import FormView from './FormView';
// import { StyledFormView } from './StyledFormView';

interface ISettings {
  widgetType?: 'both' | 'form' | 'response';
  formView?: 'fullForm' | 'oneField' | 'leaderboard' | 'button' | 'selectItem';
  whoCanSubmit?: 'all' | 'authUser';
  responsesView?: 'button' | 'table' | 'table2' | 'vertical';
  whoCanViewResponses?: 'all' | 'authUser';
  onlyMyResponses?: boolean;
  buttonLabel?: string;
}

interface IFormPage {
  settings?: ISettings;
  templateId?: string;
  templateInstanceId?: string;
  modifyForm?: (form: any) => void;
  isTemplateInstance?: string;
}

interface IProps extends IFormPage {
  slug: string;
}

export const FormPage = ({
  slug,
  settings = {},
  templateId,
  templateInstanceId,
  modifyForm,
  isTemplateInstance = '',
}: IProps) => {
  const { data, error } = useGetFormBySlug(slug);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getFormBySlug) {
    return <NotFound />;
  }

  let form = { ...data.getFormBySlug, settings: { ...data.getFormBySlug.settings, ...settings } };

  if (modifyForm) {
    form = modifyForm(form);
  }

  return (
    <FormView
      form={form}
      templateId={templateId}
      isTemplateInstance={isTemplateInstance}
      templateInstanceId={templateInstanceId}
    />
  );
};

interface IFormPageByIdProps extends IFormPage {
  _id: string;
  isAuthorized?: boolean;
}

export const FormPageById = ({
  _id,
  settings = {},
  templateId,
  templateInstanceId,
  modifyForm,
  isTemplateInstance = '',
  isAuthorized,
}: IFormPageByIdProps) => {
  const { data, error } = useGetForm(_id);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getForm) {
    return <NotFound />;
  }

  let form = { ...data.getForm, settings: { ...data.getForm.settings, ...settings } };

  if (modifyForm) {
    form = modifyForm(form);
  }

  return (
    <FormView
      form={form}
      templateId={templateId}
      isTemplateInstance={isTemplateInstance}
      templateInstanceId={templateInstanceId}
      isAuthorized={isAuthorized}
    />
  );
};
