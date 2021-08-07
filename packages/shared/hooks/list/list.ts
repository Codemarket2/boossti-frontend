import { useQuery } from '@apollo/client';
import { GET_LIST } from '../../graphql/query/list';

export function useGetList({ _id }: any) {
  const { data, error, loading } = useQuery(GET_LIST, {
    variables: { _id },
  });

  return { data, error, loading };
}
