import { useState } from 'react';
import { useRouter } from 'next/router';
import ItemScreen from '../components/template/PageScreen';

interface IProps {
  slug: any;
  typeSlug: any;
}

export default function Screen({ slug, typeSlug }: IProps) {
  const [state, setState] = useState('');
  const router = useRouter();

  const onSlugUpdate = (newSlug) => {
    router.push(`/${typeSlug}/${newSlug}`);
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
    <ItemScreen
      onSlugUpdate={onSlugUpdate}
      pushToAnchor={pushToAnchor}
      slug={slug}
      typeSlug={typeSlug}
    />
  );
}
