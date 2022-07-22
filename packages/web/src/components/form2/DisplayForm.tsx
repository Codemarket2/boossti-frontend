/* eslint-disable react/destructuring-assignment */
import { useGetForm, useGetFormBySlug } from '@frontend/shared/hooks/form';
import { defaultValueObject } from '@frontend/shared/hooks/response/createUpdateResponse';
// import { ISystemValues } from '@frontend/shared/hooks/response/calculateSystemValues';
import ErrorLoading from '../common/ErrorLoading';
import NotFound from '../common/NotFound';
import FormView from './FormView';

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
  appId?: string;
  installId?: string;
  modifyForm?: (form: any) => void;
  isTemplateInstance?: string;
  createCallback?: (response: any) => void;
  isPageOwner?: boolean;
  workFlowFormResponseParentId?: string;
  // systemValues?: ISystemValues;
  valueFilter?: any;
  overrideValues?: any;
}

interface IProps extends IFormPage {
  slug: string;
}

export const FormPage = ({
  slug,
  settings = {},
  appId,
  installId,
  modifyForm,
  isTemplateInstance = '',
  createCallback,
  isPageOwner,
  workFlowFormResponseParentId,
  // systemValues,
  valueFilter,
  overrideValues,
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
      isTemplateInstance={isTemplateInstance}
      appId={appId}
      installId={installId}
      createCallback={createCallback}
      isPageOwner={isPageOwner}
      workFlowFormResponseParentId={workFlowFormResponseParentId}
      // systemValues={systemValues}
      valueFilter={valueFilter}
      overrideValues={overrideValues}
    />
  );
};

interface IFormPageByIdProps extends IFormPage {
  _id: string;
}

const FormPageById = ({
  _id,
  settings = {},
  appId,
  installId,
  modifyForm,
  isTemplateInstance = '',
  createCallback,
  isPageOwner,
  workFlowFormResponseParentId,
  // systemValues,
  valueFilter,
  overrideValues,
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
      isTemplateInstance={isTemplateInstance}
      appId={appId}
      installId={installId}
      createCallback={createCallback}
      isPageOwner={isPageOwner}
      workFlowFormResponseParentId={workFlowFormResponseParentId}
      // systemValues={systemValues}
      valueFilter={valueFilter}
      overrideValues={overrideValues}
    />
  );
};

interface IDisplayFormProps extends IFormPage {
  slug?: string;
  _id?: string;
}

export const DisplayForm = (props: IDisplayFormProps) => {
  const overrideValues = props?.overrideValues?.map((value) => ({
    ...defaultValueObject,
    ...value,
  }));
  if (props._id) {
    return <FormPageById {...props} overrideValues={overrideValues} _id={props._id} />;
  }
  return <FormPage {...props} overrideValues={overrideValues} slug={props.slug} />;
};
