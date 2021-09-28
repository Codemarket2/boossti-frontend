import { useCreateLike, useDeleteLike } from '@frontend/shared/hooks/like/createLike';

export const useLikeUnlike = (parentId: string, likedByUser: boolean) => {
  const { handleLiked } = useCreateLike(parentId);
  const { handleLikeDelete } = useDeleteLike(parentId);

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
