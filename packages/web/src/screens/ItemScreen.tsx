import { useRouter } from 'next/router';
import UserLayout from '../components/common/UserLayout';
import ItemScreen from '../components/list/ItemScreen';

interface IProps {
  slug: any;
  typeSlug: any;
}

export default function Screen({ slug, typeSlug }: IProps) {
  const router = useRouter();
  const onSlugUpdate = (newSlug) => {
    router.push(`/types/${typeSlug}/${newSlug}`);
  };
  return (
    <UserLayout container={false} authRequired>
      <div className="px-3">
        <ItemScreen onSlugUpdate={onSlugUpdate} slug={slug} typeSlug={typeSlug} />
      </div>
    </UserLayout>
  );
}
