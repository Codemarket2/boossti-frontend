import Typography from '@mui/material/Typography';
import UserLayout from '../../components/common/UserLayout';
import UsersList from '../../components/user/UsersList';
import Breadcrumbs from '../../components/common/Breadcrumbs';

export default function UsersScreen() {
  return (
    <UserLayout authRequired mustAdmin>
      <Breadcrumbs>
        {/* <Link href="/admin">Admin</Link> */}
        <Typography color="textPrimary">Admin</Typography>
        <Typography color="textPrimary">Users</Typography>
      </Breadcrumbs>
      <UsersList />
    </UserLayout>
  );
}
