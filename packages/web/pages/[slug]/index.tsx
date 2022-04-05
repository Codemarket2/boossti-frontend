import { useRouter } from 'next/router';
// import { getTemplateMetaTags } from '@frontend/shared/hooks/metaTags';
import TypeScreen from '../../src/screens/TemplateScreen';
import Loading from '../../src/components/common/Loading';
// import Head from '../../src/components/common/Head';
import UserLayout from '../../src/components/common/UserLayout';

// interface IProps {
//   metaTags: any;
//   slug: string;
// }

export default function Page() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      {/* <Head {...metaTags} /> */}
      <UserLayout container={false} authRequired>
        {slug ? <TypeScreen slug={slug.toString()} /> : <Loading />}{' '}
      </UserLayout>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { slug } = context.query;

//   const metaTags = await getTemplateMetaTags(slug);
//   if (metaTags) {
//     metaTags.url = `/${slug}`;
//   }

//   return {
//     props: { metaTags, slug },
//   };
// }
