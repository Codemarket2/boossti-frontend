import { useMutation } from '@apollo/client';
import { client as apolloClient } from '../../graphql';
import { GET_ACTION_COUNTS } from '../../graphql/query/comment';
import { CREATE_LIKE, DELETE_LIKE } from '../../graphql/mutation/like';

export function useCreateLike(parentId: string) {
  const [createLikeMutation] = useMutation(CREATE_LIKE);
  const handleLiked = () => {
    updateLikeInCache(parentId, 1);
    createLikeMutation({
      variables: {
        parentId: parentId,
      },
    });
  };
  return {
    handleLiked,
  };
}

export const updateLikeInCache = async (parentId: string, countValue: number) => {
  const { getActionCounts } = await apolloClient.readQuery({
    query: GET_ACTION_COUNTS,
    variables: { parentId },
  });
  const newData = {
    getActionCounts: {
      ...getActionCounts,
      likeCount: getActionCounts.likeCount + countValue,
      likedByUser: countValue === 1 ? true : false,
    },
  };
  await apolloClient.writeQuery({
    query: GET_ACTION_COUNTS,
    variables: { parentId },
    data: newData,
  });
};

export function useDeleteLike(parentId) {
  const [deleteLikeMutation] = useMutation(DELETE_LIKE);
  const handleLikeDelete = async () => {
    updateLikeInCache(parentId, -1);
    deleteLikeMutation({
      variables: {
        parentId: parentId,
      },
    });
  };
  return {
    handleLikeDelete,
  };
}
