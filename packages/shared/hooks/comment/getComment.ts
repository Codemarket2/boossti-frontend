import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { GET_COMMENTS_BY_PARENT_ID, GET_ACTION_COUNTS } from '../../graphql/query/comment';
import { ADDED_COMMENT } from '../../graphql/subscription/comment';

export const useGetComments = (postId: string) => {
  const { data, error, loading, subscribeToMore } = useQuery(GET_COMMENTS_BY_PARENT_ID, {
    variables: {
      parentId: postId,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    subscribeToMore({
      document: ADDED_COMMENT,
      variables: {
        parentId: postId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newComment = subscriptionData.data.addedComment;
        let newData = [...prev.getCommentsByParentID.data];
        const isUpdated = prev.getCommentsByParentID.data.filter(
          (comment) => comment._id === newComment._id,
        );
        if (isUpdated.length > 0) {
          newData = prev.getCommentsByParentID.data.map((comment) =>
            comment._id === newComment._id ? newComment : comment,
          );
        } else {
          newData = [newComment, ...newData];
        }
        return {
          ...prev,
          getCommentsByParentID: {
            ...prev.getCommentsByParentID,
            data: newData,
          },
        };
      },
    });
  }, [data]);

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
