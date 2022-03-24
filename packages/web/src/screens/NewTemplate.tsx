import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import Link from 'next/link';
import UserLayout from '../components/common/UserLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
// import TemplateForm from '../components/template/TemplateForm';
import AddTemplateForm from '../components/template/AddTemplateForm';

export default function Screen() {
  const router = useRouter();
  return (
    <UserLayout authRequired>
      <Breadcrumbs>
        <Link href="/types">Template</Link>
        <Typography color="textPrimary">New</Typography>
      </Breadcrumbs>
      <Paper variant="outlined">
        <AddTemplateForm createCallback={(slug) => router.push(`/${slug}`)} />
      </Paper>
      {/* <TemplateForm /> */}
    </UserLayout>
  );
}
