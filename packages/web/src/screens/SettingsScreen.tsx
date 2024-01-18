import UserLayout from '../components/common/UserLayout';
import TabBar from '../components/common/TabBar';
import FBSettings from '../components/facebook/FBSettings';

export default function FeedsScreen() {
  return (
    <UserLayout authRequired>
      <TabBar />
      <FBSettings />
    </UserLayout>
  );
}
