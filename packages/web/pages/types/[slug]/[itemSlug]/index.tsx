import { guestClient } from '@frontend/shared/graphql';
import { GET_LIST_ITEM_BY_SLUG } from '@frontend/shared/graphql/query/list';
import ItemScreen from '../../../../src/screens/ItemScreen';
import Loading from '../../../../src/components/common/Loading';
import Head from '../../../../src/components/common/Head';

interface IProps {
  metaTags: any;
  itemSlug: string;
  slug: string;
}

export default function Page({ metaTags, itemSlug, slug }: IProps) {
  return (
    <>
      <Head {...metaTags} />
      {itemSlug && slug ? <ItemScreen slug={itemSlug} typeSlug={slug} /> : <Loading />}
    </>
  );
}

export async function getServerSideProps(context) {
  const { itemSlug, slug } = context.query;
  let metaTags = null;
  const regex = /(<([^>]+)>)/gi;
  try {
    const response = await guestClient.query({
      query: GET_LIST_ITEM_BY_SLUG,
      variables: { slug: itemSlug },
    });
    if (response?.data && response?.data?.getListItemBySlug) {
      const description = response?.data?.getListItemBySlug?.description?.replace(regex, '');

      metaTags = {
        title: response?.data?.getListItemBySlug?.title
          ? response?.data?.getListItemBySlug?.title
          : null,
        description,
        image:
          response.data.getListItemBySlug.media.length >= 1
            ? response.data.getListItemBySlug.media[0].url
            : null,
      };
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: { metaTags, itemSlug, slug },
  };
}
