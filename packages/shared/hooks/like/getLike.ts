import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_LIKES_BY_PARENT_ID } from '../../graphql/query/like';
import { ADDED_LIKE } from '../../graphql/subscription/like';

export const useGetLikes = (parentId: string) => {
  const { data, error, loading, subscribeToMore } = useQuery(GET_LIKES_BY_PARENT_ID, {
    variables: {
      parentId: parentId,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    subscribeToMore({
      document: ADDED_LIKE,
      variables: {
        parentId: parentId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newLike = subscriptionData.data.addedLike;
        return {
          ...prev,
          getLikesByParentId: {
            ...prev.getLikesByParentId,
            data: [newLike, ...prev.getLikesByParentId.data],
          },
        };
      },
    });
  }, []);
  return { data, error, loading };
};
