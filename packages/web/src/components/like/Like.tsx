import { IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLikeUnlike } from './utils/useLikeUnlikeHook';

interface ILike {
  threadId: string;
  likedByUser: boolean;
  commentLike?: boolean;
}

export default function Like({ threadId, likedByUser, commentLike = false }: ILike) {
  const { handleLikeDislike } = useLikeUnlike(threadId, likedByUser);

  return (
    <>
      <Tooltip title="Like">
        {commentLike ? (
          <FavoriteIcon style={{ color: likedByUser && 'red' }} onClick={handleLikeDislike} />
        ) : (
          <IconButton edge="start" aria-label="like" onClick={handleLikeDislike}>
            <FavoriteIcon style={{ color: likedByUser && 'red' }} />
          </IconButton>
        )}
      </Tooltip>
    </>
  );
}
