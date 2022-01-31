import { guestClient } from '@frontend/shared/graphql';
import { GET_LIST_ITEM_BY_SLUG } from '@frontend/shared/graphql/query/list';
import UserLayout from '../../src/components/common/UserLayout';
import Head from '../../src/components/common/Head';
import PublishedPage from '../../src/screens/PublishedPage';
import { QRCodeGenerator } from '../../src/components/qrcode/QRCode';
import { useEffect, useState } from 'react';

interface IProps {
  metaTags: any;
  slug: string;
}

export default function Page({ slug, metaTags = {} }: IProps) {
  const [currUrl, setCurrUrl] = useState('');
  useEffect(() => {
    setCurrUrl(window.location.href);
  }, []);
  return (
    <>
      <Head {...metaTags} />
      <UserLayout container={false}>
        <QRCodeGenerator url={currUrl} />

        <div className="pt-2"> {slug && <PublishedPage slug={slug.toString()} />}</div>
      </UserLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  let metaTags = null;
  const regex = /(<([^>]+)>)/gi;
  try {
    const response = await guestClient.query({
      query: GET_LIST_ITEM_BY_SLUG,
      variables: { slug },
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
    props: { metaTags, slug },
  };
}
