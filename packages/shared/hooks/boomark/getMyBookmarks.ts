import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_BOOKMARKS } from '../../graphql/query/bookmark';

export function useGetMyBookmarks() {
  const [state, setState] = useState({ search: '' });
  const res = useQuery(GET_MY_BOOKMARKS, {
    variables: { limit: 50, page: 1, search: state.search },
    fetchPolicy: 'network-only',
  });
  return { ...res, state, setState };
}
