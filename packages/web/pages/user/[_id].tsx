import { useRouter } from 'next/router';
import ProfileScreen from '../../src/screens/ProfileScreen';
import Loading from '../../src/components/common/Loading';

export default function Page() {
  const router = useRouter();
  const { _id } = router.query;
  if (_id) {
    return <ProfileScreen _id={_id} />;
  }
  return <Loading />;
}
