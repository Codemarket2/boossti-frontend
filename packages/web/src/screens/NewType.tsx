import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import UserLayout from '../components/common/UserLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ListTypeForm from '../components/list/ListTypeForm';

export default function Screen() {
  return (
    <UserLayout authRequired mustAdmin>
      <Breadcrumbs>
        <Link href="/types">Template</Link>
        <Typography color="textPrimary">New</Typography>
      </Breadcrumbs>
      <ListTypeForm />
    </UserLayout>
  );
}
