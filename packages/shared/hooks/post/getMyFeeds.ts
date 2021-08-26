import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS, GET_USER_POSTS } from '../../graphql/query/post';
import { ADDED_POST } from '../../graphql/subscription/post';
import { guestClient } from '../../graphql';

export function useGetMyFeeds() {
  const [state, setState] = useState({ search: '', showSearch: false });
  const { data, loading, error, subscribeToMore } = useQuery(GET_POSTS, {
    variables: { limit: 20, page: 1, search: state.search },
    fetchPolicy: 'cache-and-network',
  });

  // console.log('data, loading, error', data, loading, error);

  useEffect(() => {
    subscribeToMore({
      document: ADDED_POST,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.addedPost;
        return {
          ...prev,
          getPosts: {
            ...prev.getPosts,
            data: [newFeedItem, ...prev.getPosts.data],
          },
        };
      },
    });
  }, []);

  return { data, loading, error, state, setState };
}

export function useUserFeeds({ userId }: any) {
  const [state, setState] = useState({
    search: '',
    showSearch: false,
  });

  const [res, setRes] = useState({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    setRes({ ...res, loading: true });
    guestClient
      .query({
        query: GET_USER_POSTS,
        variables: { userId: userId, limit: 20, page: 1, search: state.search },
      })
      .then(({ data }) => setRes({ ...res, data, loading: false }))
      .catch((error) => setRes({ ...res, error, loading: false }));
  }, [state.search]);

  return { ...res, state, setState };
}
