import { useRouter } from 'next/router';
import { useState } from 'react';
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
  const [state, setState] = useState('');
  const { data, error } = useGetListItemBySlug({ slug });
  const router = useRouter();

  const pushToAnchor = () => {
    if (router.asPath.includes('#')) {
      if (state !== router.asPath) {
        setState(router.asPath);
        setTimeout(() => {
          router.push(router.asPath);
        }, 1500);
      }
    }
  };

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
      <ItemScreen pushToAnchor={pushToAnchor} slug={slug} hideBreadcrumbs />
    </AuthRequired>
  ) : (
    <ItemScreen pushToAnchor={pushToAnchor} slug={slug} hideBreadcrumbs />
  );
}
