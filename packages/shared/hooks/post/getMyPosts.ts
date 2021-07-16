import { useQuery, useMutation } from '@apollo/client';
import { GET_MY_POSTS } from '../../graphql/query/post';

export function useGetMyPosts() {
  const res = useQuery(GET_MY_POSTS, {
    variables: { limit: 20, page: 1 },
    fetchPolicy: 'network-only',
  });
  return res;
}
