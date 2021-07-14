import { useRouter } from 'next/router';
import AdminLayout from '../../../src/components/admin/AdminLayout';
import AdminList from '../../../src/components/list/AdminList';

export default function Page() {
  const router = useRouter();
  const { _id } = router.query;
  return <AdminLayout>{_id && <AdminList _id={_id} />}</AdminLayout>;
}
