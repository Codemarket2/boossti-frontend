import { useEffect, useState } from 'react';
import { guestClient } from '@frontend/shared/graphql';
import { GET_LIST_ITEM_BY_SLUG } from '@frontend/shared/graphql/query/list';
import ItemScreen from '../../../src/screens/ItemScreen';
import Loading from '../../../src/components/common/Loading';
import Head from '../../../src/components/common/Head';
import UserLayout from '../../../src/components/common/UserLayout';
import { QRCodeGenerator } from '../../../src/components/qrcode/QRCode';

interface IProps {
  metaTags: any;
  itemSlug: string;
  slug: string;
}

export default function Page({ metaTags, itemSlug, slug }: IProps) {
  const [currUrl, setCurrUrl] = useState('');
  useEffect(() => {
    setCurrUrl(window.location.href);
  }, []);
  return (
    <>
      <Head {...metaTags} />
      <UserLayout container={false}>
        <QRCodeGenerator url={currUrl} />
        {itemSlug && slug ? <ItemScreen slug={itemSlug} typeSlug={slug} /> : <Loading />}
      </UserLayout>
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
    if (response?.data?.getListItemBySlug) {
      metaTags = {
        title: response?.data?.getListItemBySlug?.title || null,
        description: response?.data?.getListItemBySlug?.description?.replace(regex, '') || null,
        image: response?.data?.getListItemBySlug?.media[0]?.url || null,
      };
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: { metaTags, itemSlug, slug },
  };
}
