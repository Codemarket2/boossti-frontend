import { useRouter } from 'next/router';
// import AdminLayout from '../../../src/components/admin/AdminLayout';
// import List from '../../../src/components/admin/List';

export default function Page() {
  const router = useRouter();
  const { _id } = router.query;
  // return <AdminLayout>{_id && <List _id={_id} />}</AdminLayout>;
  return <p>User - {_id}</p>;
}
