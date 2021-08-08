import UserLayout from '../../components/common/UserLayout';
import UsersList from '../../components/user/UsersList';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Link from 'next/link';

export default function UsersScreen() {
  return (
    <UserLayout>
      <Breadcrumbs>
        {/* <Link href="/admin">Admin</Link> */}
        <Typography color="textPrimary">Admin</Typography>
        <Typography color="textPrimary">Users</Typography>
      </Breadcrumbs>
      <UsersList />
    </UserLayout>
  );
}
