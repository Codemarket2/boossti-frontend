import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { useGetActionCounts } from '@frontend/shared/hooks/comment/getComment';
import ErrorLoading from '../ErrorLoading';
import LikeModal from '../../like/LikeModal';
import Like from '../../like/Like';
import Comment from '../../comment/Comment';
import Share from '../../share/Share';
import Overlay from '../Overlay';

interface ICommentLikeShare {
  parentId: string;
  showDivider?: boolean;
  children?: React.ReactNode;
  index?: any;
  itemSlug?: string;
  commentId?: string;
  fieldTitle?: string;
  showHideComments?: boolean;
  setShowHideComments?: any;
}

export default function CommentLikeShare({
  parentId,
  showDivider = true,
  children,
  index,
  itemSlug,
  commentId,
  fieldTitle,
  showHideComments,
  setShowHideComments,
}: ICommentLikeShare) {
  const { data, error } = useGetActionCounts(parentId);
  // like modal state & effect
  const [open, setOpen] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const handleOpenLikeModal = () => {
    setOpen(true);
  };

  const handleCloseLikeModal = () => {
    setOpen(false);
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
          <IconButton onClick={() => setShowComment(!showComment)}>
            <ChatBubbleIcon />
          </IconButton>
          {data?.getActionCounts?.commentCount && data.getActionCounts.commentCount > 0 ? (
            <span className="mr-2">{data.getActionCounts.commentCount}</span>
          ) : null}
          <IconButton>
            <Share
              index={index}
              itemSlug={itemSlug}
              commentId={commentId}
              fieldTitle={fieldTitle}
            />
          </IconButton>
          {children}
        </div>
      </div>
      {/* {(showHideComments || showCommentSection) && (
        <Fragment>
          {showDivider && <Divider />}
        </Fragment>
      )} */}
      <Overlay open={showComment} onClose={() => setShowComment(false)} title="Comments">
        <div className="p-2">
          <Comment
            postId={parentId}
            threadId={parentId}
            itemSlug={itemSlug}
            shareIndex={index}
            fieldTitle={fieldTitle}
          />
        </div>
      </Overlay>
    </div>
  );
}
