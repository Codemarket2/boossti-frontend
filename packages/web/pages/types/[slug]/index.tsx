import { useRouter } from 'next/router';
import TypeScreen from '../../../src/screens/TypeScreen';
import Loading from '../../../src/components/common/Loading';
import Head from '../../../src/components/common/Head';
import { getMetaTags } from '@frontend/shared';
interface IProps {
  metaTags: any;
}
export default function Page({ metaTags }: IProps) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Head {...metaTags} />
      {slug ? <TypeScreen slug={slug} /> : <Loading />}
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const metaTags = await getMetaTags(slug);

  return {
    props: { metaTags },
  };
}
