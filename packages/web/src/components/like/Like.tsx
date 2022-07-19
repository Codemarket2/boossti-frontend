import { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLikeUnlike } from './utils/useLikeUnlikeHook';
import LikeModal from './LikeModal';

interface LikeProps {
  threadId: string;
  likedByUser: boolean;
  commentLike?: boolean;
  likeCount: number;
}

export default function Like({ threadId, likedByUser, commentLike = false, likeCount }: LikeProps) {
  const { handleLikeDislike } = useLikeUnlike(threadId, likedByUser);
  const [showLikeModel, setShowLikeModel] = useState(false);

  const handleOpenLikeModal = () => {
    setShowLikeModel(true);
  };

  const handleCloseLikeModal = () => {
    setShowLikeModel(false);
  };

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
      {likeCount > 0 && (
        <>
          <span onClick={handleOpenLikeModal} style={{ cursor: 'pointer' }} className="mr-2">
            {likeCount}
          </span>
          {showLikeModel && (
            <LikeModal
              threadId={threadId}
              handleOpenLikeModal={handleOpenLikeModal}
              handleCloseLikeModal={handleCloseLikeModal}
              totalLike={likeCount}
              open={showLikeModel}
            />
          )}
        </>
      )}
    </>
  );
}
