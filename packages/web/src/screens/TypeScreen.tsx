import { useGetListTypeBySlug } from '@frontend/shared/hooks/list';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import UserLayout from '../components/common/UserLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ErrorLoading from '../components/common/ErrorLoading';
import ListItems from '../components/list/ListItems';

interface IProps {
  slug: any;
}

export default function Screen({ slug }: IProps) {
  const { data, loading, error } = useGetListTypeBySlug({ slug });
  if (error || !data || !data.getListTypeBySlug) {
    return <ErrorLoading error={error} />;
  }
  return (
    <UserLayout authRequired>
      <Breadcrumbs>
        <Link href="/types">Types</Link>
        <Typography color="textPrimary">{data.getListTypeBySlug.name}</Typography>
      </Breadcrumbs>
      {/* <Typography variant="h2">{data.getListTypeBySlug.name}</Typography>
      <Typography>{data.getListTypeBySlug.description}</Typography> */}
      <ListItems
        types={[data.getListTypeBySlug._id]}
        name={data.getListTypeBySlug.name}
        slug={data.getListTypeBySlug.slug}
      />
    </UserLayout>
  );
}
