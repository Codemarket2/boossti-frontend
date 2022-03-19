import UserLayout from '../components/common/UserLayout';
import Templates from '../components/template/Templates';

export default function TypesScreen() {
  return (
    <UserLayout authRequired>
      <Templates />
    </UserLayout>
  );
}
