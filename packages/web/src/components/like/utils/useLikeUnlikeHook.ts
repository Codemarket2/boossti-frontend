import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCreateLike, useDeleteLike } from '@frontend/shared/hooks/like/createLike';
import { useGetLikes } from '@frontend/shared/hooks/like/getLike';

export const useLikeUnlike = (parentId: string, likedByUser: any) => {
  const { attributes } = useSelector(({ auth }: any) => auth);
  const currentUserId = attributes['custom:_id'];
  const { handleLiked } = useCreateLike(parentId);
  const { data, error } = useGetLikes(parentId);
  const { handleLikeDelete } = useDeleteLike();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (likedByUser !== null && likedByUser.like === true) {
      setLiked(true);
    }
  }, [likedByUser]);

  useEffect(() => {
    data;
  }, [data]);

  const handleLikeDislike = () => {
    setLiked(!liked);
    if (data!.getLikesByParentId!.data!.length === 0 || liked === false) {
      handleLiked();
    }
    if (data!.getLikesByParentId!.data!.length !== 0 || liked === true) {
      const getLike = data!.getLikesByParentId!.data!.find(
        (user) => user.createdBy._id === currentUserId,
      );
      const index = data!.getLikesByParentId!.data!.findIndex(
        (user) => user.createdBy._id === currentUserId,
      );
      handleLikeDelete(getLike._id, getLike.parentId, index);
    }
  };

  return {
    data,
    error,
    handleLikeDislike,
    liked,
  };
};
