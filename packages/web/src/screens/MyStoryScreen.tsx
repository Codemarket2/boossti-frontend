import UserLayout from '../components/common/UserLayout';
import TabBar from '../components/common/TabBar';
import About from '../components/user/About';
import { useSelector } from 'react-redux';

export default function FeedsScreen() {
  const attributes = useSelector(({ auth }: any) => auth.attributes);
  return (
    <UserLayout authRequired>
      <TabBar />
      <About userId={attributes['custom:_id']} />
    </UserLayout>
  );
}
