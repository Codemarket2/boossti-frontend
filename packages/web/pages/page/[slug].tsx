import { useRouter } from 'next/router';
import Layout2, { Section } from '../../src/components/common/Layout2';

export default function Page() {
  const router = useRouter();
  const { slug } = router.query;

  return <Layout2>{slug && <Section slug={slug.toString()} />}</Layout2>;
}
