import { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_POSTS, GET_USER_POSTS } from '../../graphql/query/post';
import { ADDED_POST } from '../../graphql/subscription/post';
import { ADDED_LIKE } from '../../graphql/subscription/like';
import { guestClient } from '../../graphql';
import { updateLikeInCache } from '../like/createLike';

export function useGetMyFeeds() {
  const [state, setState] = useState({ search: '', showSearch: false });
  const { data, loading, error, subscribeToMore } = useQuery(GET_POSTS, {
    variables: { limit: 20, page: 1, search: state.search },
    fetchPolicy: 'cache-and-network',
  });
  const { data: likeData, loading: likeLoading, error: likeError } = useSubscription(ADDED_LIKE);
  // console.log('data, loading, error', data, loading, error);

  useEffect(() => {
    if (likeData && likeData.addedLike) {
      const currentPost = data.getPosts.data.filter((post) => {
        post._id === likeData.addedLike.parentId;
      });
      if (currentPost.length > 0) {
        updateLikeInCache(likeData.addedLike.parentId, 1);
      }
    }
  }, [likeData]);

  useEffect(() => {
    subscribeToMore({
      document: ADDED_POST,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.addedPost;
        let newData = [...prev.getPosts.data];
        const isUpdated = prev.getPosts.data.filter((post) => post._id === newFeedItem._id);
        if (isUpdated.length > 0) {
          newData = prev.getPosts.data.map((post) => {
            post._id === newFeedItem._id ? newFeedItem : post;
          });
        } else {
          newData = [newFeedItem, ...newData];
        }
        return {
          ...prev,
          getPosts: {
            ...prev.getPosts,
            data: newData,
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
