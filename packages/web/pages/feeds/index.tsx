import UserLayout from '../../src/components/common/UserLayout';
import Feeds from '../../src/components/form2/feed/Feeds';

export default function FeedPage() {
  return (
    <UserLayout container={false} authRequired>
      <Feeds />
    </UserLayout>
  );
}
