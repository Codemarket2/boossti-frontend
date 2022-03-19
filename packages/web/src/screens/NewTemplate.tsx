import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import UserLayout from '../components/common/UserLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import TemplateForm from '../components/template/TemplateForm';

export default function Screen() {
  return (
    <UserLayout authRequired mustAdmin>
      <Breadcrumbs>
        <Link href="/types">Template</Link>
        <Typography color="textPrimary">New</Typography>
      </Breadcrumbs>
      <TemplateForm />
    </UserLayout>
  );
}
