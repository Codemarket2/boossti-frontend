import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import ErrorLoading from '../common/ErrorLoading';
import NotFound from '../common/NotFound';
import { StyledFormView } from './StyledFormView';

export const FormPage = ({ slug }: { slug: string }) => {
  const { data, error } = useGetFormBySlug(slug);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getFormBySlug) {
    return <NotFound />;
  }
  return <StyledFormView form={data.getFormBySlug} />;
};
