import { useRouter } from 'next/router';
import CommentScreen from '../../src/screens/CommentScreen';

export default function Page() {
  const router = useRouter();
  const { _id } = router.query;

  return <CommentScreen _id={_id?.toString()} />;
}
