import { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_POSTS, GET_USER_POSTS } from '../../graphql/query/post';
import { ADDED_POST } from '../../graphql/subscription/post';

export function useGetMyFeeds() {
  const [state, setState] = useState({ search: '', showSearch: false });
  const res = useQuery(GET_POSTS, {
    variables: { limit: 20, page: 1, search: state.search },
    fetchPolicy: 'cache-and-network',
  });
  const {
    data: subscriptionData,
    loading: subscriptionLoading,
    error: subscriptionError,
  } = useSubscription(ADDED_POST);

  // useEffect(() => {
  //   res.subscribeToMore({
  //     document: ADDED_POST,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev;
  //       const newFeedItem = subscriptionData.data.newBookingSub;
  //       return {
  //         ...prev,
  //         getAllBookingsSearch: {
  //           bookings: [newFeedItem, ...prev.getAllBookingsSearch.bookings],
  //         },
  //       };
  //     },
  //   });
  // }, []);
  useEffect(() => {
    console.log(
      'subscriptionData, subscriptionLoading, subscriptionError',
      subscriptionData,
      subscriptionLoading,
      subscriptionError,
    );
  }, [subscriptionData, subscriptionLoading, subscriptionError]);

  return { ...res, state, setState };
}

export function useUserFeeds({ userId }: any) {
  const [state, setState] = useState({ search: '', showSearch: false });
  const res = useQuery(GET_USER_POSTS, {
    variables: { userId: userId, limit: 20, page: 1, search: state.search },
    fetchPolicy: 'cache-and-network',
  });
  return { ...res, state, setState };
}
