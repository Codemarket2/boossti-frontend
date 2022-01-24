import { useRouter } from 'next/router';
import { useGetForm } from '@frontend/shared/hooks/form';
import Paper from '@material-ui/core/Paper';
import FormView from '../../src/components/form2/FormView';
import ErrorLoading from '../../src/components/common/ErrorLoading';
import UserLayout from '../../src/components/common/UserLayout';
import NotFound from '../../src/components/common/NotFound';

export default function Page() {
  const router = useRouter();
  const { _id } = router.query;
  const { data, error } = useGetForm(_id?.toString());

  if (error || !data || !data?.getForm) {
    return <ErrorLoading error={error} />;
  }
  return (
    <UserLayout authRequired={!data?.getForm?.settings?.authRequired}>
      {data?.getForm?.settings?.published ? (
        <Paper variant="outlined" className="mt-2 px-2">
          <FormView form={data?.getForm} />
        </Paper>
      ) : (
        <NotFound />
      )}
    </UserLayout>
  );
}
