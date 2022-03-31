import { useRouter } from 'next/router';
import { useGetFormBySlug } from '@frontend/shared/hooks/form';
// import { getTemplateMetaTags } from '@frontend/shared/hooks/metaTags';
import TemplateScreen2 from '../../src/screens/TemplateScreen2';
// import Loading from '../../src/components/common/Loading';
// import Head from '../../src/components/common/Head';
import UserLayout from '../../src/components/common/UserLayout';
import ErrorLoading from '../../src/components/common/ErrorLoading';
import NotFound from '../../src/components/common/NotFound';

// interface IProps {
//   metaTags: any;
//   slug: string;
// }

export default function Page() {
  const router = useRouter();
  const { slug } = router.query;
  const { data, error } = useGetFormBySlug('template');

  return (
    <>
      {/* <Head {...metaTags} /> */}
      <UserLayout container={false} authRequired>
        {error ? (
          <ErrorLoading error={error} />
        ) : data?.getFormBySlug?._id && slug ? (
          <TemplateScreen2 slug={slug.toString()} templateForm={data?.getFormBySlug} />
        ) : (
          <NotFound />
        )}
        {/* {slug ?  : <Loading />} */}
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
