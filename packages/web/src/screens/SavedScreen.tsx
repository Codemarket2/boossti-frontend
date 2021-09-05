import UserLayout from '../components/common/UserLayout';
import TabBar from '../components/common/TabBar';
import BookmarkList from '../components/bookmark/BookmarkList';

export default function FeedsScreen() {
  return (
    <UserLayout authRequired>
      <TabBar />
      <BookmarkList />
    </UserLayout>
  );
}
