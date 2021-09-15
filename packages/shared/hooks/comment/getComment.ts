import React, { useState, useEffect } from 'react';
import { GET_COMMENTS_BY_PARENT_ID, GET_COMMENTCOUNT } from '../../graphql/query/comment';
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

export const useGetCommentCount = (postId: string) => {
  const { data, error, loading } = useQuery(GET_COMMENTCOUNT, {
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
