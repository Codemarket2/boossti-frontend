import { useGetListItemBySlug } from '@frontend/shared/hooks/list';
import Skeleton from '@material-ui/lab/Skeleton';
import ErrorLoading from '../components/common/ErrorLoading';
import NotFound from '../components/common/NotFound';
import AuthRequired from '../components/common/AuthRequired';
import ItemScreen from '../components/list/ItemScreen';

interface IProps {
  slug: string;
}

export default function PublishedPage({ slug }: IProps) {
  const { data, error } = useGetListItemBySlug({ slug });

  if (error || !data) {
    return (
      <ErrorLoading>
        <Skeleton variant="text" height={100} />
      </ErrorLoading>
    );
  }

  if (!data?.getListItemBySlug || !data?.getListItemBySlug?.active) {
    return <NotFound />;
  }

  return data?.getListItemBySlug?.authenticateUser ? (
    <AuthRequired>
      <ItemScreen slug={slug} hideBreadcrumbs noTogglePreviewMode />
    </AuthRequired>
  ) : (
    <ItemScreen slug={slug} hideBreadcrumbs noTogglePreviewMode />
  );
}
