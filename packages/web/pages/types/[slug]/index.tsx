import { getMetaTags } from '@frontend/shared';
import TypeScreen from '../../../src/screens/TypeScreen';
import Loading from '../../../src/components/common/Loading';
import Head from '../../../src/components/common/Head';

interface IProps {
  metaTags: any;
  slug: string;
}
export default function Page({ metaTags, slug }: IProps) {
  return (
    <>
      <Head {...metaTags} />
      {slug ? <TypeScreen slug={slug.toString()} /> : <Loading />}
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const metaTags = await getMetaTags(slug);
  return {
    props: { metaTags, slug },
  };
}
