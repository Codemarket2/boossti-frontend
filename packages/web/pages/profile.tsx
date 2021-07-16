import UserLayout from '../src/components/common/UserLayout';
import ProfileScreen from '../src/screens/ProfileScreen';

export default function Page() {
  return (
    <UserLayout authRequired>
      <ProfileScreen />
    </UserLayout>
  );
}
