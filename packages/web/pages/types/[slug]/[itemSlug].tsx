import { useRouter } from 'next/router';
import ItemScreen from '../../../src/screens/ItemScreen';
import Loading from '../../../src/components/common/Loading';

export default function Page() {
  const router = useRouter();
  const { itemSlug } = router.query;
  if (itemSlug) {
    return <ItemScreen slug={itemSlug} />;
  }
  return <Loading />;
}
