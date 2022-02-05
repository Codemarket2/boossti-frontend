import { getMetaTags } from '@frontend/shared';
import TypeScreen from '../../src/screens/TypeScreen';
import Loading from '../../src/components/common/Loading';
import Head from '../../src/components/common/Head';
import UserLayout from '../../src/components/common/UserLayout';

interface IProps {
  metaTags: any;
  slug: string;
}
export default function Page({ metaTags, slug }: IProps) {
  return (
    <>
      <Head {...metaTags} />
      {slug ? (
        <UserLayout container={false} authRequired>
          <TypeScreen slug={slug.toString()} />
        </UserLayout>
      ) : (
        <Loading />
      )}
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
