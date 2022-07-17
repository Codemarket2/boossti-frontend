import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/ModeComment';
import Divider from '@mui/material/Divider';
import { useGetActionCounts } from '@frontend/shared/hooks/comment/getComment';
import Tooltip from '@mui/material/Tooltip';
import ErrorLoading from '../common/ErrorLoading';
import LikeModal from '../like/LikeModal';
import Like from '../like/Like';
import CommentsList from './CommentsList';
import Share from '../share/Share';
import Overlay from '../common/Overlay';

interface CommentLikeShareProps {
  threadId: string;
  parentIds?: string[];
  showDivider?: boolean;
  children?: React.ReactNode;
  index?: any;
  itemSlug?: string;
  commentId?: string;
  fieldTitle?: string;
  showHideComments?: boolean;
  isReply?: boolean;
  onCommentsListToggle?: (toggle: boolean) => void;
}

const spacingStyles = {
  borderLeft: '1px solid lightgrey',
  marginLeft: 17,
  paddingLeft: 26,
};

export default function CommentLikeShare({
  threadId,
  parentIds = [],
  showDivider = true,
  children,
  index,
  itemSlug,
  commentId,
  fieldTitle,
  showHideComments,
  isReply,
  onCommentsListToggle,
}: CommentLikeShareProps) {
  const { data, error } = useGetActionCounts(threadId);

  const [open, setOpen] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const handleOpenLikeModal = () => {
    setOpen(true);
  };

  const handleCloseLikeModal = () => {
    setOpen(false);
  };

  const handleToggleCommentsList = () => {
    setShowComment(!showComment);
    if (onCommentsListToggle) {
      onCommentsListToggle(!showComment);
    }
  };

  const CommentsListComponent = (
    <div style={isReply && spacingStyles}>
      <CommentsList
        threadId={threadId}
        parentIds={parentIds?.length > 0 ? [...parentIds, threadId] : [threadId]}
        itemSlug={itemSlug}
        shareIndex={index}
        fieldTitle={fieldTitle}
      />
    </div>
  );

  return (
    <div className="mt-n2">
      {error && <ErrorLoading error={error} />}
      <div
        className="d-flex align-items-center"
        style={
          isReply && {
            ...spacingStyles,
            borderLeft: showComment ? '1px solid lightgrey' : 'none',
          }
        }
      >
        <Like threadId={threadId} likedByUser={data?.getActionCounts?.likedByUser || false} />
        <div>
          {data?.getActionCounts?.likeCount && data.getActionCounts.likeCount > 0 ? (
            <>
              <span onClick={handleOpenLikeModal} style={{ cursor: 'pointer' }} className="mr-2">
                {data.getActionCounts.likeCount}
              </span>
              {open && (
                <LikeModal
                  threadId={threadId}
                  handleOpenLikeModal={handleOpenLikeModal}
                  handleCloseLikeModal={handleCloseLikeModal}
                  totalLike={data.getActionCounts.likeCount}
                  open={open}
                />
              )}
            </>
          ) : null}
          <Tooltip title={`${showComment ? 'Hide' : 'Show'} Comment`}>
            <IconButton onClick={handleToggleCommentsList}>
              <CommentIcon />
            </IconButton>
          </Tooltip>
          {data?.getActionCounts?.commentCount > 0 && (
            <Tooltip title={`${data.getActionCounts.commentCount} Comments`}>
              <span className="mr-2">{data.getActionCounts.commentCount}</span>
            </Tooltip>
          )}
          <Share index={index} itemSlug={itemSlug} commentId={commentId} fieldTitle={fieldTitle} />
          {children}
        </div>
      </div>
      {isReply ? (
        (showHideComments || showComment) && (
          <>
            {showDivider && <Divider />}
            {CommentsListComponent}
          </>
        )
      ) : (
        <Overlay open={showComment} onClose={() => setShowComment(false)} title="Comments">
          <div className="p-2">{CommentsListComponent}</div>
        </Overlay>
      )}
    </div>
  );
}
