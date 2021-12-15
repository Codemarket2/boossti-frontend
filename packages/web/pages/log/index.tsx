import UserLayout from '../../src/components/common/UserLayout';
import ActivityList from '../../src/components/activityLog/ActivityList';

export default function ActivityLog() {
  return (
    <UserLayout authRequired>
      <ActivityList />
    </UserLayout>
  );
}
