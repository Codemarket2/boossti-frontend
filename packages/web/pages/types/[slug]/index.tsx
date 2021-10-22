import { useRouter } from 'next/router';
import { GET_LIST_TYPE_BY_SLUG } from '@frontend/shared/graphql/query/list';
import TypeScreen from '../../../src/screens/TypeScreen';
import Loading from '../../../src/components/common/Loading';
import { guestClient } from '@frontend/shared/graphql';

interface IProps {
  metaTags: any;
}
export default function Page({ metaTags }: IProps) {
  const router = useRouter();
  const { slug } = router.query;

  if (slug) {
    return <TypeScreen slug={slug} metaTags={metaTags} />;
  }
  return <Loading />;
}

export async function getServerSideProps(context) {
  let metaTags = null;
  const { slug } = context.query;
  const regex = /(<([^>]+)>)/gi;
  try {
    const response = await guestClient.query({
      query: GET_LIST_TYPE_BY_SLUG,
      variables: { slug },
    });
    if (response.data && response.data.getListTypeBySlug) {
      const description = response.data.getListTypeBySlug.description.replace(regex, '');
      metaTags = {
        title: response.data.getListTypeBySlug.title,
        // description: response.data.getListTypeBySlug.description,
        description: description,
        image:
          response.data.getListTypeBySlug.media.length >= 1
            ? response.data.getListTypeBySlug.media[0].url
            : null,
      };
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: { metaTags },
  };
}
