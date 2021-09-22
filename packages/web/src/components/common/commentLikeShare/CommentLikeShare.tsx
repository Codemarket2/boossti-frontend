import React, { useState } from 'react';
import { Button, IconButton, Divider, Grid } from '@material-ui/core';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import ShareIcon from '@material-ui/icons/Share';

import { useGetActionCounts } from '@frontend/shared/hooks/comment/getComment';
import { useGetLikes } from '@frontend/shared/hooks/like/getLike';
import ErrorLoading from '../ErrorLoading';
import LikeModal from '../../like/LikeModal';
import PostLike from '../../like/PostLike';
import Comment from '../../comment/Comment';

interface ICommentLikeShare {
  parentId: string;
}
export default function CommentLikeShare({ parentId }: ICommentLikeShare) {
  const { data, error } = useGetActionCounts(parentId);
  const { data: likeData, error: likeError } = useGetLikes(parentId);
  const [open, setOpen] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);

  const toggleCommentSection = () => {
    setShowCommentSection(!showCommentSection);
  };
  const handleOpenLikeModal = () => {
    setOpen(true);
  };

  const handleCloseLikeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container lg={12} md={12} sm={12}>
        {!data || error || !data!.getActionCounts ? (
          <ErrorLoading error={error} />
        ) : (
          <>
            <PostLike parentId={parentId} likedByUser={data!.getActionCounts!.likedByUser} />
            {!likeData || !likeData!.getLikesByParentId!.data || likeError ? (
              <ErrorLoading error={likeError} />
            ) : (
              <>
                <Button onClick={handleOpenLikeModal} color="primary">
                  Likes
                  {likeData!.getLikesByParentId!.data!.length}
                </Button>
                <LikeModal
                  handleOpenLikeModal={handleOpenLikeModal}
                  handleCloseLikeModal={handleCloseLikeModal}
                  totalLike={data!.getActionCounts!.likeCount}
                  open={open}
                  data={likeData!.getLikesByParentId!.data}
                />
              </>
            )}
            <Button onClick={toggleCommentSection} color="primary">
              Comment
              {/* <ModeCommentIcon /> */}
              {data!.getActionCounts!.commentCount && data!.getActionCounts!.commentCount}
            </Button>
            <Button color="primary">
              Share
              {/* <ShareIcon /> */}
            </Button>
          </>
        )}

        <Grid item lg={12} md={12} sm={12}>
          {showCommentSection && (
            <>
              <Divider />
              <Comment postId={parentId} />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
