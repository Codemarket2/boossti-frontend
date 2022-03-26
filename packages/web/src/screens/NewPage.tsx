import Typography from '@material-ui/core/Typography';
import { useGetTemplateBySlug } from '@frontend/shared/hooks/template';
import Link from 'next/link';
import UserLayout from '../components/common/UserLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import PageForm from '../components/template/PageForm';
import ErrorLoading from '../components/common/ErrorLoading';

export default function Screen({ slug }: any) {
  const { data, loading, error } = useGetTemplateBySlug({ slug });

  if (error || !data || !data.getTemplateBySlug) {
    return <ErrorLoading error={error} />;
  }
  return (
    <UserLayout authRequired mustAdmin>
      <Breadcrumbs>
        <Link href="/templates">Template</Link>
        <Link href={`/${data.getTemplateBySlug.slug}`}>{data.getTemplateBySlug.title}</Link>
        <Typography color="textPrimary">New</Typography>
      </Breadcrumbs>
      <PageForm
        typeSlug={data.getTemplateBySlug.slug}
        template={data.getTemplateBySlug._id}
        parentId={data.getTemplateBySlug._id}
      />
    </UserLayout>
  );
}
