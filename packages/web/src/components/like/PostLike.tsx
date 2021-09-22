import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useSelector } from 'react-redux';

import { useCreateLike, useDeleteLike } from '@frontend/shared/hooks/like/createLike';
import { useGetLikes } from '@frontend/shared/hooks/like/getLike';
import ErrorLoading from '../common/ErrorLoading';
interface ILike {
  parentId: string;
  likedByUser: any;
}
export default function PostLike({ parentId, likedByUser }: ILike) {
  const { attributes } = useSelector(({ auth }: any) => auth);
  const currentUserId = attributes['custom:_id'];
  const { handleLiked } = useCreateLike(parentId);
  const { data, error } = useGetLikes(parentId);
  const { handleLikeDelete } = useDeleteLike();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    data;
  }, [data]);

  return (
    <>
      {!data || !data!.getLikesByParentId!.data || error ? (
        <ErrorLoading error={error} />
      ) : (
        <IconButton
          aria-label="like"
          onClick={() => {
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
          }}>
          {
            <>
              <FavoriteIcon style={{ color: (likedByUser || liked) && 'red' }} />
            </>
          }
        </IconButton>
      )}
    </>
  );
}
