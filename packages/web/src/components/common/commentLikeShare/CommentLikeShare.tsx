import { Fragment, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { useGetActionCounts } from '@frontend/shared/hooks/comment/getComment';
import ErrorLoading from '../ErrorLoading';
import LikeModal from '../../like/LikeModal';
import Like from '../../like/Like';
import Comment from '../../comment/Comment';

interface ICommentLikeShare {
  parentId: string;
}
export default function CommentLikeShare({ parentId }: ICommentLikeShare) {
  const { data, error } = useGetActionCounts(parentId);
  // like modal state & effect
  const [open, setOpen] = useState(false);
  const handleOpenLikeModal = () => {
    setOpen(true);
  };

  const handleCloseLikeModal = () => {
    setOpen(false);
  };
  //comment state
  const [showCommentSection, setShowCommentSection] = useState(false);
  const toggleCommentSection = () => {
    setShowCommentSection(!showCommentSection);
  };

  return (
    <div className="w-100">
      {error && <ErrorLoading error={error} />}
      <div className="d-flex align-items-center">
        <Like parentId={parentId} likedByUser={data?.getActionCounts?.likedByUser || false} />
        <div>
          {data?.getActionCounts?.likeCount && data.getActionCounts.likeCount > 0 ? (
            <>
              <span onClick={handleOpenLikeModal} style={{ cursor: 'pointer' }} className="mr-2">
                {data.getActionCounts.likeCount}
              </span>
              {open && (
                <LikeModal
                  parentId={parentId}
                  handleOpenLikeModal={handleOpenLikeModal}
                  handleCloseLikeModal={handleCloseLikeModal}
                  totalLike={data.getActionCounts.likeCount}
                  open={open}
                />
              )}
            </>
          ) : null}
          <IconButton onClick={toggleCommentSection}>
            <ChatBubbleIcon />
          </IconButton>
          {data?.getActionCounts?.commentCount && data.getActionCounts.commentCount > 0 ? (
            <span className="mr-2">{data.getActionCounts.commentCount}</span>
          ) : null}
          <IconButton>
            <ShareIcon />
          </IconButton>
        </div>
      </div>
      {showCommentSection && (
        <Fragment>
          <Divider />
          <Comment postId={parentId} threadId={parentId} />
        </Fragment>
      )}
    </div>
  );
}
