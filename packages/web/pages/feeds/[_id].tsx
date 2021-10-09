import { useRouter } from 'next/router';

import PostScreen from '../../src/screens/PostScreen';

export default function Page() {
  const router = useRouter();
  const { _id } = router.query;
  return <PostScreen _id={_id} />;
}
