// import { useRouter } from 'next/router';
// import { getPageMetaTags } from '@frontend/shared/hooks/metaTags';
// import ItemScreen from '../../../src/screens/PageScreen';
import { useGetTemplateBySlug } from '@frontend/shared/hooks/template';
import { useRouter } from 'next/router';
import ErrorLoading from '../../../src/components/common/ErrorLoading';
import NotFound from '../../../src/components/common/NotFound';
// import Head from '../../../src/components/common/Head';
import UserLayout from '../../../src/components/common/UserLayout';
import TemplateInstanceView from '../../../src/components/template/TemplateInstanceView';

// interface IProps {
//   metaTags: any;
//   itemSlug: string;
//   slug: string;
// }

export default function InstancePage() {
  const router = useRouter();
  const { slug, instanceCount } = router.query;
  const { data, error } = useGetTemplateBySlug({ slug });

  return (
    <>
      <UserLayout container={false}>
        {error || !data ? (
          <ErrorLoading error={error} />
        ) : !data.getTemplateBySlug ? (
          <NotFound />
        ) : (
          <>
            <TemplateInstanceView
              template={data.getTemplateBySlug}
              instanceCount={Number(instanceCount)}
            />
          </>
        )}
      </UserLayout>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { itemSlug, slug } = context.query;

//   const metaTags = await getPageMetaTags(itemSlug);
//   if (metaTags) {
//     metaTags.url = `/${slug}/${itemSlug}`;
//   }

//   return {
//     props: { metaTags, slug, itemSlug },
//   };
// }
