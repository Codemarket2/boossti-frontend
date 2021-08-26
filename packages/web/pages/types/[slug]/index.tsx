import { useRouter } from 'next/router';
import TypeScreen from '../../../src/screens/TypeScreen';
import Loading from '../../../src/components/common/Loading';

export default function Page() {
  const router = useRouter();
  const { slug } = router.query;
  if (slug) {
    return <TypeScreen slug={slug} />;
  }
  return <Loading />;
}
