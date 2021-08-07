import { useGetList } from '@frontend/shared/hooks/list';
import ErrorLoading from '../components/common/ErrorLoading';
import UserLayout from '../components/common/UserLayout';

interface IProps {
  _id: any;
}

export default function ListScreen({ _id }: IProps) {
  const { data, error, loading } = useGetList({ _id });
  // if (error || loading || !data) {
  //   return <ErrorLoading error={error} />;
  // }
  return (
    <UserLayout>
      {error || loading || !data ? <ErrorLoading error={error} /> : <div>{_id}</div>}
    </UserLayout>
  );
}
