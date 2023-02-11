import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import { useRouter } from 'next/router';
import UserLayout from '../../../src/components/common/UserLayout';
import ErrorLoading from '../../../src/components/common/ErrorLoading';
import NotFound from '../../../src/components/common/NotFound';
import Form from '../../../src/components/form2/Form';

export default function Page(): any {
  const router = useRouter();
  const { slug } = router.query;

  const { data, error } = useGetFormBySlug(slug?.toString());
  const onSlugChange = (newSlug) => {
    if (slug !== newSlug) {
      router.push(`/form/${newSlug}`);
    }
  };

  return (
    <UserLayout container={false} authRequired feedLayout>
      {error || !data ? (
        <ErrorLoading error={error} />
      ) : !data?.getFormBySlug?._id ? (
        <NotFound />
      ) : (
        <Form form={data?.getFormBySlug} onSlugChange={onSlugChange} />
      )}
    </UserLayout>
  );
}
