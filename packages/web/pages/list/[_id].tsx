import { useRouter } from 'next/router';
import ListScreen from '../../src/screens/ListScreen';
import Loading from '../../src/components/common/Loading';

export default function Page() {
  const router = useRouter();
  const { _id } = router.query;
  if (_id) {
    return <ListScreen _id={_id} />;
  }
  return <Loading />;
}
