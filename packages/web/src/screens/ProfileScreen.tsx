import { useSelector } from 'react-redux';
import UserLayout from '../components/common/UserLayout';
import UserProfile from '../components/user/UserProfile';
import GuestProfile from '../components/user/GuestProfile';

export default function Page({ _id }: any) {
  const { authenticated, attributes,initial } = useSelector(({ auth }: any) => auth);
  const isCurrentUser = authenticated && attributes.['custom:_id'] === _id;
  if(initial){
  return (
    <UserLayout>
      {isCurrentUser ? <UserProfile /> : _id && <GuestProfile _id={_id} />}
    </UserLayout>
  );
}
  return <p>ot initalise</p>
}
