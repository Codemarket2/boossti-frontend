import { useCreateLike, useDeleteLike } from '@frontend/shared/hooks/like/createLike';

export const useLikeUnlike = (threadId: string, likedByUser: boolean) => {
  const { handleLiked } = useCreateLike(threadId);
  const { handleLikeDelete } = useDeleteLike(threadId);

  const handleLikeDislike = () => {
    if (likedByUser) {
      handleLikeDelete();
    } else {
      handleLiked();
    }
  };

  return {
    handleLikeDislike,
  };
};
