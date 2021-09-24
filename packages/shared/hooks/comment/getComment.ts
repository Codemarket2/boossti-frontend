import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { ADDED_COMMENT } from '../../graphql/subscription/comment';
import { GET_COMMENTS_BY_PARENT_ID, GET_ACTION_COUNTS } from '../../graphql/query/comment';

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
        return {
          ...prev,
          getCommentsByParentID: {
            ...prev.getCommentsByParentID,
            data: [newComment, ...prev.getCommentsByParentID.data],
          },
        };
      },
    });
  }, []);

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
