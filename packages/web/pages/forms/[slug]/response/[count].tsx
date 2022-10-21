import { useRouter } from 'next/router';
import UserLayout from '../../../../src/components/common/UserLayout';
import ResponseScreen from '../../../../src/screens/ResponseScreen';

export default function Page() {
  const router = useRouter();
  const { count, slug } = router.query;

  return (
    <UserLayout authRequired={false} container={false}>
      {slug && (
        <ResponseScreen
          slug={slug?.toString()}
          count={count?.toString()}
          deleteCallback={(form) => router.push(`/forms/${form?.slug}`)}
        />
      )}
    </UserLayout>
  );
}
