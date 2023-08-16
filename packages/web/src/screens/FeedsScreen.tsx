import FeedsList from '../components/post/FeedsList';
import UserLayout from '../components/common/UserLayout';
import TabBar from '../components/common/TabBar';

export default function FeedsScreen() {
  return (
    <UserLayout authRequired>
      <div className="mt-2">
        <TabBar />
        <FeedsList />
      </div>
    </UserLayout>
  );
}
