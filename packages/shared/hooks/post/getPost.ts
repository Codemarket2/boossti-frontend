import { useQuery } from '@apollo/client';

import { GET_POST } from '../../graphql/query/post';
import { useLikeSubscription } from '../like/getLike';

export const useGetPost = (_id) => {
  const { data, loading, error } = useQuery(GET_POST, {
    variables: {
      _id,
      fetchPolicy: 'cache-and-network',
    },
  });
  useLikeSubscription();
  return {
    data,
    loading,
    error,
  };
};
