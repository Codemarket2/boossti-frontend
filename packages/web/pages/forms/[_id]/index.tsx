import { useRouter } from 'next/router';
import UserLayout from '../../../src/components/common/UserLayout';
import ErrorLoading from '../../../src/components/common/ErrorLoading';
import Form from '../../../src/components/form2/Form';

export default function Page(): any {
  const router = useRouter();
  const { _id } = router.query;

  return (
    <UserLayout container={false} authRequired>
      {_id ? <Form _id={_id.toString()} /> : <ErrorLoading />}
    </UserLayout>
  );
}
