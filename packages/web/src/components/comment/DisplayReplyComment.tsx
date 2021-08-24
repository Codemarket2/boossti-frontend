import React, { useState, useEffect } from 'react';

import { useUpdateComment } from '@frontend/shared/hooks/comment/createComment';
import CommentInput from './CommentInput';
import DisplayCard from './DisplayCard';

interface IDisplayReplyComment {
  postId: string;
  handleDelete: any;
  commentedUser: any;
  index: number;
}

export default function DisplayReplyComment({
  postId,
  handleDelete,
  commentedUser,
  index,
}: IDisplayReplyComment) {
  const [edit, setEdit] = useState(false);
  const { handleUpdate, setUpdateInputVal, updateInputVal } = useUpdateComment(
    postId,
    commentedUser._id,
    setEdit,
  );
  useEffect(() => {
    if (updateInputVal === '') {
      setUpdateInputVal(commentedUser?.body);
    }
  }, []);

  const handleOnChangeUpdate = (e) => {
    let updateVal = e.target.value;
    setUpdateInputVal(updateVal);
  };
  return (
    <>
      {edit && commentedUser._id ? (
        <CommentInput
          inputVal={updateInputVal}
          handleChange={handleOnChangeUpdate}
          onClick={handleUpdate}
        />
      ) : (
        <DisplayCard
          commentedUser={commentedUser}
          handleDelete={handleDelete}
          index={index}
          postId={postId}
          setEdit={setEdit}
        />
      )}
    </>
  );
}
