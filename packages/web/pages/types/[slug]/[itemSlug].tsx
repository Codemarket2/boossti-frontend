import { useRouter } from 'next/router';
import ItemScreen from '../../../src/screens/ItemScreen';
import Loading from '../../../src/components/common/Loading';

export default function Page() {
  const router = useRouter();
  const { itemSlug, slug } = router.query;
  if (itemSlug && slug) {
    return <ItemScreen slug={itemSlug} typeSlug={slug} />;
  }
  return <Loading />;
}
