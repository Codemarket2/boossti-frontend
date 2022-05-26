import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import Link from 'next/link';
import UserLayout from '../components/common/UserLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import AddTemplateForm from '../components/template/AddTemplateForm';

export default function NewTemplate() {
  const router = useRouter();
  return (
    <UserLayout authRequired>
      <Breadcrumbs>
        <Link href="/templates">Template</Link>
        <Typography color="textPrimary">New</Typography>
      </Breadcrumbs>
      <Paper variant="outlined">
        <AddTemplateForm createCallback={(slug) => router.push(`/${slug}`)} />
      </Paper>
    </UserLayout>
  );
}
