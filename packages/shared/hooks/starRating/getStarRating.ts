import { useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';

import {
  GET_STAR_RATING,
  GET_STAR_RATINGS_BY_PARENT_ID,
  GET_RATING_COUNTS,
} from '../../graphql/query/starRating';

export const useGetStarRating = (parentId: string) => {
  const { data, error, loading, subscribeToMore } = useQuery(GET_STAR_RATINGS_BY_PARENT_ID, {
    variables: {
      parentId,
    },
    fetchPolicy: 'cache-and-network',
  });

  return { data, error, loading };
};

export const useGetUserStarRating = (parentId: string) => {
  const { data, error, loading } = useQuery(GET_RATING_COUNTS, {
    variables: {
      parentId,
    },
    fetchPolicy: 'cache-and-network',
  });

  return { data, error, loading };
};
