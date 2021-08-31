import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core/';

import { useCreateComment, useDeleteComment } from '@frontend/shared/hooks/comment/createComment';
import { useGetComments } from '@frontend/shared/hooks/comment/getComment';
import CommentInput from './CommentInput';
import DisplayComment from './DisplayComment';

interface IComment {
  postId: string;
}

export default function Comment({ postId }: IComment) {
  const { handleSave, inputVal, setInputVal, loading: submitLoading } = useCreateComment(postId);
  const { handleDelete, loading: deleteLoading } = useDeleteComment();
  const { data, loading } = useGetComments(postId);

  const handleChange = (e) => {
    let newVal = e.target.value;
    setInputVal(newVal);
  };

  return (
    <>
      {loading || submitLoading || deleteLoading ? (
        <CircularProgress />
      ) : (
        data &&
        data?.getCommentsByParentID?.data?.map((commentedUser, index) => (
          <DisplayComment
            key={commentedUser._id}
            postId={postId}
            commentedUser={commentedUser}
            index={index}
            handleDelete={handleDelete}
          />
        ))
      )}

      <CommentInput
        handleChange={handleChange}
        onClick={handleSave}
        inputVal={inputVal}
        postId={postId}
      />
    </>
  );
}
