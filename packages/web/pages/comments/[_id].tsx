import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const { _id } = router.query;

  return <div>{_id} - comment</div>;
}
