import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useCreateLike, useDeleteLike } from '@frontend/shared/hooks/like/createLike';
import { useGetLikes } from '@frontend/shared/hooks/like/getLike';
import ErrorLoading from '../common/ErrorLoading';
interface ILike {
  parentId: string;
}
export default function Like({ parentId }: ILike) {
  const { data, error } = useGetLikes(parentId);
  const { handleLiked } = useCreateLike(parentId);
  const [liked, setLiked] = useState(false);
  console.log(data);

  //   useEffect();

  return (
    <>
      {!data || !data!.getLikesByParentId!.data || error ? (
        <ErrorLoading error={error} />
      ) : (
        <IconButton
          aria-label="like"
          onClick={() => {
            setLiked(!liked);
            if (data!.getLikesByParentId!.data.length === 0 || liked === false) {
              handleLiked();
            }
          }}>
          <FavoriteIcon style={{ color: liked && 'red' }} />
          {data && data!.getLikesByParentId!.data.length}
        </IconButton>
      )}
    </>
  );
}
