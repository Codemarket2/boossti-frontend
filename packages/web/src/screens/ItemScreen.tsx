import { useGetListItemBySlug } from '@frontend/shared/hooks/list';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import UserLayout from '../components/common/UserLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ErrorLoading from '../components/common/ErrorLoading';

interface IProps {
  slug: any;
}

export default function Screen({ slug }: IProps) {
  const { data, loading, error } = useGetListItemBySlug({ slug });
  if (error || !data || !data.getListItemBySlug) {
    return <ErrorLoading error={error} />;
  }

  console.log('data.getListItemBySlug.types', data.getListItemBySlug.types);
  return (
    <UserLayout authRequired>
      <Breadcrumbs>
        <Link href="/types">Types</Link>
        <Link href="/types">
          <a>{data.getListItemBySlug.types[0].name}</a>
        </Link>
        <Typography color="textPrimary">{data.getListItemBySlug.title}</Typography>
      </Breadcrumbs>
      <Typography variant="h2">{data.getListItemBySlug.title}</Typography>
      <Typography>{data.getListItemBySlug.description}</Typography>
    </UserLayout>
  );
}
