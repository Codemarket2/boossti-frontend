import { useRouter } from 'next/router';
import UserLayout from '../../src/components/common/UserLayout';
import Response from '../../src/components/form2/Response';

export default function Page() {
  const router = useRouter();
  const { _id } = router.query;

  return <UserLayout authRequired>{_id && <Response responseId={_id?.toString()} />}</UserLayout>;
}
