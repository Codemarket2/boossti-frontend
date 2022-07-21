import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  GET_COMMENTS_BY_PARENT_ID,
  GET_ACTION_COUNTS,
  GET_COMMENT,
} from '../../graphql/query/comment';
import { useLikeSubscription } from '../like/getLike';
import { ADDED_COMMENT } from '../../graphql/subscription/comment';

export const useGetComments = (threadId: string, commentIds: string[]) => {
  const { data, error, loading, subscribeToMore, refetch } = useQuery(GET_COMMENTS_BY_PARENT_ID, {
    variables: {
      threadId,
      commentIds,
    },
    fetchPolicy: 'cache-and-network',
  });
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!subscribed) {
      setSubscribed(true);
      subscribeToMore({
        document: ADDED_COMMENT,
        variables: {
          threadId,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newComment = subscriptionData.data.addedComment;
          let newData = [...prev.getCommentsByThreadId.data];
          const wasUpdated = false;
          newData = prev.getCommentsByThreadId.data.map((comment) => {
            if (comment._id === newComment._id) {
              return { ...comment, ...newComment };
            }
            return comment;
          });
          if (!wasUpdated) {
            newData = [newComment, ...newData];
          }
          return {
            ...prev,
            getCommentsByThreadId: {
              ...prev.getCommentsByThreadId,
              data: newData,
            },
          };
        },
      });
    }
  }, []);

  return {
    data,
    error,
    loading,
    refetch,
  };
};

export const useGetComment = (_id) => {
  const { data, error, loading } = useQuery(GET_COMMENT, {
    variables: {
      _id,
    },
    // fetchPolicy: 'cache-and-network',
  });
  useLikeSubscription();
  return { data, error, loading };
};

export const useGetActionCounts = (threadId: string) => {
  const { data, error, loading } = useQuery(GET_ACTION_COUNTS, {
    variables: {
      threadId,
    },
    fetchPolicy: 'cache-and-network',
  });
  return {
    data,
    error,
    loading,
  };
};
