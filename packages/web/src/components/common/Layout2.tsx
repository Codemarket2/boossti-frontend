import { ReactNode } from 'react';
import { useGetListItemBySlug } from '@frontend/shared/hooks/list';
import Skeleton from '@material-ui/lab/Skeleton';
import FieldValues from '../field/FieldValues';
import ErrorLoading from './ErrorLoading';
import NotFound from './NotFound';
import AuthRequired from './AuthRequired';

interface ISectionProps {
  slug: string;
  checkAuth?: boolean;
}

export function Section({ slug, checkAuth = true }: ISectionProps) {
  const { data, error } = useGetListItemBySlug({ slug });

  if (error || !data) {
    return (
      <ErrorLoading>
        <Skeleton variant="text" height={100} />
      </ErrorLoading>
    );
  }

  if (!data?.getListItemBySlug && checkAuth) {
    return <NotFound />;
  }
  if (!data?.getListItemBySlug) {
    return null;
  }

  const FV = (
    <FieldValues
      parentId={data?.getListItemBySlug?._id}
      typeId={data?.getListItemBySlug?.types[0]?._id}
      previewMode
      layouts={JSON.parse(data?.getListItemBySlug?.layouts) || {}}
    />
  );

  return checkAuth && data?.getListItemBySlug?.authenticateUser ? (
    <AuthRequired>{FV}</AuthRequired>
  ) : (
    FV
  );
}

interface IProps {
  children: ReactNode;
}

export default function Layout2({ children }: IProps) {
  return (
    <div>
      <Section slug="menu" checkAuth={false} />
      <div className="container">{children}</div>
      <Section slug="footer" checkAuth={false} />
    </div>
  );
}
