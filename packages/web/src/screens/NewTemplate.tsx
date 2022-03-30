import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import Link from 'next/link';
import UserLayout from '../components/common/UserLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import AddTemplateForm from '../components/template/AddTemplateForm';
import { FormPage } from './HomeScreen-new';

export default function Screen() {
  const router = useRouter();
  return (
    <UserLayout authRequired>
      <Breadcrumbs>
        <Link href="/templates">Template</Link>
        <Typography color="textPrimary">New</Typography>
      </Breadcrumbs>
      <Paper variant="outlined">
        {/* <AddTemplateForm createCallback={(slug) => router.push(`/${slug}`)} /> */}
        <FormPage slug="widget" settings={{ widgetType: 'form' }} />
      </Paper>
    </UserLayout>
  );
}
