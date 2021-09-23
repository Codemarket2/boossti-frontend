import React from 'react';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { useLikeUnlike } from './utils/useLikeUnlikeHook';
import ErrorLoading from '../common/ErrorLoading';
interface ILike {
  parentId: string;
  likedByUser: any;
  commentLike?: boolean;
}
export default function Like({ parentId, likedByUser, commentLike = false }: ILike) {
  const { data, error, handleLikeDislike, liked } = useLikeUnlike(parentId, likedByUser);

  return (
    <>
      {!data || !data!.getLikesByParentId!.data || error ? (
        <ErrorLoading error={error} />
      ) : (
        <>
          {commentLike ? (
            <>
              {!data || !data!.getLikesByParentId!.data || error ? (
                <ErrorLoading error={error} />
              ) : (
                <FavoriteIcon style={{ color: liked && 'red' }} onClick={handleLikeDislike} />
              )}
            </>
          ) : (
            <IconButton aria-label="like" onClick={handleLikeDislike}>
              {
                <>
                  <FavoriteIcon style={{ color: liked && 'red' }} />
                </>
              }
            </IconButton>
          )}
        </>
      )}
    </>
  );
}
