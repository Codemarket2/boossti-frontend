import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core/';

import { useCreateComment, useDeleteComment } from '@frontend/shared/hooks/comment/createComment';
import { useGetComments } from '@frontend/shared/hooks/comment/getComment';
import CommentInput from './CommentInput';
import DisplayComment from './DisplayComment';
import ErrorLoading from '../common/ErrorLoading';
interface IComment {
  postId: string;
  label?: string;
  showInput?: boolean;
}

export default function Comment({ postId, label, showInput = true }: IComment) {
  const { handleSave, inputVal, setInputVal, loading: submitLoading } = useCreateComment(postId);
  const { handleDelete, loading: deleteLoading } = useDeleteComment();
  const { data, error } = useGetComments(postId);

  const handleChange = (e) => {
    let newVal = e.target.value;
    setInputVal(newVal);
  };

  return (
    <>
      {error || !data || !data.getCommentsByParentID ? (
        <ErrorLoading error={error} />
      ) : (
        data &&
        data?.getCommentsByParentID?.data?.map((commentedUser, index) => (
          <>
            <DisplayComment
              key={commentedUser._id}
              postId={postId}
              commentedUser={commentedUser}
              index={index}
              handleDelete={handleDelete}
            />
          </>
        ))
      )}
      {showInput && (
        <CommentInput
          handleChange={handleChange}
          onClick={handleSave}
          inputVal={inputVal}
          postId={postId}
          label={label}
        />
      )}
    </>
  );
}
