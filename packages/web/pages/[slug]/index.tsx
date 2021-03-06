import { getTemplateMetaTags } from '@frontend/shared/hooks/metaTags';
import TemplateScreen from '../../src/screens/TemplateScreen';
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
      <UserLayout container={false}>
        {slug ? <TemplateScreen slug={slug.toString()} /> : <Loading />}
      </UserLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const metaTags = await getTemplateMetaTags(slug);
  if (metaTags) {
    metaTags.url = `/${slug}`;
  }

  return {
    props: { metaTags, slug },
  };
}
