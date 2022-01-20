import UserLayout from '../components/common/UserLayout';
import ListTypes from '../components/list/ListTypes';

export default function TypesScreen() {
  return (
    <UserLayout authRequired>
      <ListTypes />
    </UserLayout>
  );
}
