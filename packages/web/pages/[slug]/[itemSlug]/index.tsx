// import { getPageMetaTags } from '@frontend/shared/hooks/metaTags';
import ItemScreen from '../../../src/screens/PageScreen';
import Loading from '../../../src/components/common/Loading';
// import Head from '../../../src/components/common/Head';
import UserLayout from '../../../src/components/common/UserLayout';

interface IProps {
  metaTags: any;
  itemSlug: string;
  slug: string;
}

export default function Page({ metaTags, itemSlug, slug }: IProps) {
  return (
    <>
      {/* <Head {...metaTags} /> */}
      <UserLayout container={false}>
        {itemSlug && slug ? <ItemScreen slug={itemSlug} typeSlug={slug} /> : <Loading />}
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
