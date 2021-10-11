import { useState } from 'react';
import { useRouter } from 'next/router';
import UserLayout from '../components/common/UserLayout';
import ItemScreen from '../components/list/ItemScreen';

interface IProps {
  slug: any;
  typeSlug: any;
  metaTags?: any;
}

export default function Screen({ slug, typeSlug, metaTags }: IProps) {
  const [state, setState] = useState('');
  const router = useRouter();
  const onSlugUpdate = (newSlug) => {
    router.push(`/types/${typeSlug}/${newSlug}`);
  };

  const pushToAnchor = () => {
    if (router.asPath.includes('#')) {
      if (state !== router.asPath) {
        setState(router.asPath);
        setTimeout(() => {
          router.push(router.asPath);
        }, 1500);
      }
    }
  };

  return (
    <UserLayout
      container={false}
      authRequired
      title={metaTags.title}
      description={metaTags.description}
      image={metaTags.image}>
      <div className="px-3">
        <ItemScreen
          onSlugUpdate={onSlugUpdate}
          pushToAnchor={pushToAnchor}
          slug={slug}
          typeSlug={typeSlug}
        />
      </div>
    </UserLayout>
  );
}
