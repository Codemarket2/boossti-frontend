import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
        <IconButton edge="start" aria-label="like" onClick={handleLikeDislike} size="large">
          <FavoriteIcon style={{ color: likedByUser && 'red' }} />
        </IconButton>
      )}
    </>
  );
}
