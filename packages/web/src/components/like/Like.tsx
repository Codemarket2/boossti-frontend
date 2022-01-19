import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useLikeUnlike } from './utils/useLikeUnlikeHook';

interface ILike {
  parentId: string;
  likedByUser: boolean;
  commentLike?: boolean;
}

export default function Like({ parentId, likedByUser, commentLike = false }: ILike) {
  const { handleLikeDislike } = useLikeUnlike(parentId, likedByUser);

  return (
    <>
      {commentLike ? (
        <FavoriteIcon style={{ color: likedByUser && 'red' }} onClick={handleLikeDislike} />
      ) : (
        <IconButton edge="start" aria-label="like" onClick={handleLikeDislike}>
          <FavoriteIcon style={{ color: likedByUser && 'red' }} />
        </IconButton>
      )}
    </>
  );
}
