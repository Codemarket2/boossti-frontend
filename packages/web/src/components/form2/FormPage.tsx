import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import ErrorLoading from '../common/ErrorLoading';
import NotFound from '../common/NotFound';
import { StyledFormView } from './StyledFormView';

interface ISettings {
  widgetType?: 'both' | 'form' | 'response';
  formView?: 'fullForm' | 'oneField' | 'leaderboard' | 'button' | 'selectItem';
  whoCanSubmit?: 'all' | 'authUser';
  responsesView?: 'button' | 'table' | 'table2' | 'vertical';
  onlyMyResponses?: boolean;
  buttonLabel?: string;
}

interface IProps {
  slug: string;
  settings?: ISettings;
  templateId?: string;
}

export const FormPage = ({ slug, settings, templateId }: IProps) => {
  const { data, error } = useGetFormBySlug(slug);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getFormBySlug) {
    return <NotFound />;
  }

  return (
    <StyledFormView
      form={{ ...data.getFormBySlug, settings: { ...data.getFormBySlug.settings, ...settings } }}
      templateId={templateId}
    />
  );
};
