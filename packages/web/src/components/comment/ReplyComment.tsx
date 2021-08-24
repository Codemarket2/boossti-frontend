import React from 'react';
import { Grid, Divider } from '@material-ui/core';

import { useCreateComment, useDeleteComment } from '@frontend/shared/hooks/comment/createComment';
import { useGetComments } from '@frontend/shared/hooks/comment/getComment';
import CommentInput from './CommentInput';
import DisplayReplyComment from './DisplayReplyComment';

interface IReplyComment {
  replyOnComment: boolean;
  postId: string;
}

export default function ReplyComment({ replyOnComment, postId }: IReplyComment) {
  const { handleSave, inputVal, setInputVal } = useCreateComment(postId);
  const { data } = useGetComments(postId);
  const { handleDelete } = useDeleteComment();
  const handleChange = (e) => {
    let newVal = e.target.value;
    setInputVal(newVal);
  };

  return (
    <>
      <Grid container>
        <Grid item lg={1}>
          <Divider orientation="vertical" variant="inset" />
        </Grid>
        <Grid item lg={11}>
          {data &&
            data?.getCommentsByParentID?.data?.map((commentedUser, index) => (
              <DisplayReplyComment
                key={commentedUser._id}
                postId={postId}
                commentedUser={commentedUser}
                index={index}
                handleDelete={handleDelete}
              />
            ))}
          {replyOnComment && (
            <CommentInput
              label="reply on comment"
              inputVal={inputVal}
              onClick={handleSave}
              postId={postId}
              handleChange={handleChange}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
