import { Fragment, useState } from 'react';
import { Button, IconButton, Divider, Grid } from '@material-ui/core';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import ShareIcon from '@material-ui/icons/Share';

import { useGetActionCounts } from '@frontend/shared/hooks/comment/getComment';
import { useGetLikes } from '@frontend/shared/hooks/like/getLike';
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
              <Button
                onClick={handleOpenLikeModal}
                color="primary"
                className="text-capitalize ml-n3 p-0 m-0">
                {data.getActionCounts.likeCount} Likes
              </Button>
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
          <Button
            onClick={toggleCommentSection}
            color="primary"
            className="text-capitalize p-0 m-0">
            {data?.getActionCounts?.commentCount && data.getActionCounts.commentCount > 0
              ? `${data.getActionCounts.commentCount} Comments`
              : 'Comment'}
          </Button>
          <Button color="primary" className="text-capitalize p-0 m-0">
            {'Share'}
          </Button>
        </div>
      </div>
      {showCommentSection && (
        <Fragment>
          <Divider />
          <Comment postId={parentId} />
        </Fragment>
      )}
    </div>
  );
}
