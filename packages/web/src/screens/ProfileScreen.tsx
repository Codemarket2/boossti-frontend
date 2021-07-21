import UserLayout from '../components/common/UserLayout';
// import UserProfile from '../components/user/UserProfile';
import GuestProfile from '../components/user/GuestProfile';

export default function Page({ _id }: any) {
  return (
    <UserLayout authRequired>
      {/* <UserProfile /> */}
      {_id && <GuestProfile _id={_id} />}
    </UserLayout>
  );
}
