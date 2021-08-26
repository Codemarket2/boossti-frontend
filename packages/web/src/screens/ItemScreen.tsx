import UserLayout from '../components/common/UserLayout';
import ItemScreen from '../components/list/ItemScreen';

interface IProps {
  slug: any;
  typeSlug: any;
}

export default function Screen({ slug, typeSlug }: IProps) {
  return (
    <UserLayout authRequired>
      <ItemScreen slug={slug} typeSlug={typeSlug} />
    </UserLayout>
  );
}
