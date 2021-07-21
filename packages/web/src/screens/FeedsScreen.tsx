import FeedsList from '../components/post/FeedsList';
import UserLayout from '../components/common/UserLayout';

export default function FeedsScreen() {
  return (
    <UserLayout authRequired>
      <FeedsList />
    </UserLayout>
  );
}
