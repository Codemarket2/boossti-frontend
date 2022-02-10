import { useEffect, useState } from 'react';
import { getListItemMetaTags } from '@frontend/shared/hooks/metaTags';
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

  const metaTags = await getListItemMetaTags(itemSlug);
  if (metaTags) {
    metaTags.url = `/${slug}/${itemSlug}`;
  }

  return {
    props: { metaTags, slug, itemSlug },
  };
}
