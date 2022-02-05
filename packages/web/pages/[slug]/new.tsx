import { useRouter } from 'next/router';
import NewItem from '../../src/screens/NewItem';
import Loading from '../../src/components/common/Loading';

export default function Page() {
  const router = useRouter();
  const { slug } = router.query;
  if (slug) {
    return <NewItem slug={slug} />;
  }
  return <Loading />;
}
