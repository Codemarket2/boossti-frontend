import Typography from '@material-ui/core/Typography';
import { useGetListTypeBySlug } from '@frontend/shared/hooks/list';
import Link from 'next/link';
import UserLayout from '../components/common/UserLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ListItemForm from '../components/list/ListItemForm';
import ErrorLoading from '../components/common/ErrorLoading';

export default function Screen({ slug }: any) {
  const { data, loading, error } = useGetListTypeBySlug({ slug });
  if (error || !data || !data.getListTypeBySlug) {
    return <ErrorLoading error={error} />;
  }
  return (
    <UserLayout authRequired mustAdmin>
      <Breadcrumbs>
        <Link href="/types">Types</Link>
        <Link href={`/types/${data.getListTypeBySlug.slug}`}>{data.getListTypeBySlug.name}</Link>
        <Typography color="textPrimary">New</Typography>
      </Breadcrumbs>
      <ListItemForm typeSlug={data.getListTypeBySlug.slug} types={[data.getListTypeBySlug._id]} />
    </UserLayout>
  );
}
