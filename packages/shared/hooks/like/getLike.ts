import React, { useState, useEffect } from 'react';
import { GET_LIKES_BY_PARENT_ID } from '../../graphql/query/like';
import { useQuery } from '@apollo/client';

export const useGetLikes = (parentId: string) => {
  const { data, error, loading } = useQuery(GET_LIKES_BY_PARENT_ID, {
    variables: {
      parentId: parentId,
    },
    fetchPolicy: 'cache-and-network',
  });

  return { data, error, loading };
};
