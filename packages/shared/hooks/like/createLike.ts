import { useMutation } from '@apollo/client';
import { client as apolloClient } from '../../graphql';
import { GET_ACTION_COUNTS } from '../../graphql/query/comment';
import { CREATE_LIKE, DELETE_LIKE } from '../../graphql/mutation/like';

export function useCreateLike(threadId: string) {
  const [createLikeMutation] = useMutation(CREATE_LIKE);
  const handleLiked = () => {
    updateLikeInCache(threadId, 1);
    createLikeMutation({
      variables: {
        threadId,
      },
    });
  };
  return {
    handleLiked,
  };
}

export const updateLikeInCache = async (threadId: string, countValue: number) => {
  const data = await apolloClient.readQuery({
    query: GET_ACTION_COUNTS,
    variables: { threadId },
  });
  if (data && data.getActionCounts) {
    const newData = {
      getActionCounts: {
        ...data.getActionCounts,
        likeCount: data.getActionCounts.likeCount + countValue,
        likedByUser: countValue === 1,
      },
    };
    await apolloClient.writeQuery({
      query: GET_ACTION_COUNTS,
      variables: { threadId },
      data: newData,
    });
  }
};

export function useDeleteLike(threadId) {
  const [deleteLikeMutation] = useMutation(DELETE_LIKE);
  const handleLikeDelete = async () => {
    updateLikeInCache(threadId, -1);
    deleteLikeMutation({
      variables: {
        threadId,
      },
    });
  };
  return {
    handleLikeDelete,
  };
}
