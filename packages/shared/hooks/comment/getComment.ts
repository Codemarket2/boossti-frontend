import { GET_COMMENTS_BY_PARENT_ID, GET_ACTION_COUNTS } from '../../graphql/query/comment';
import { useQuery } from '@apollo/client';

export const useGetComments = (postId: string) => {
  const { data, error, loading } = useQuery(GET_COMMENTS_BY_PARENT_ID, {
    variables: {
      parentId: postId,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    data,
    error,
    loading,
  };
};

export const useGetActionCounts = (parentId: string) => {
  const { data, error, loading } = useQuery(GET_ACTION_COUNTS, {
    variables: {
      parentId: parentId,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    data,
    error,
    loading,
  };
};
