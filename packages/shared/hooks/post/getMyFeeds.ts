import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../../graphql/query/post';

export function useGetMyFeeds() {
  const [state, setState] = useState({ search: '' });
  const res = useQuery(GET_POSTS, {
    variables: { limit: 20, page: 1, search: state.search },
    fetchPolicy: 'cache-and-network',
  });
  return { ...res, state, setState };
}
