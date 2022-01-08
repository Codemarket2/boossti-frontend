import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateComment } from '@frontend/shared/hooks/comment/createComment';
import CommentInput from './CommentInput';
import DisplayCard from './DisplayCard';

interface IDisplayComment {
  postId: string;
  threadId: string;
  handleDelete: any;
  commentedUser: any;
  index: number;
  itemSlug?: string;
  shareIndex?: any;
  fieldTitle?: string;
}

export default function DisplayComment({
  postId,
  handleDelete,
  commentedUser,
  index,
  threadId,
  itemSlug,
  shareIndex,
  fieldTitle,
}: IDisplayComment) {
  const { attributes } = useSelector(({ auth }: any) => auth);
  const currentUserId = attributes['custom:_id'];

  const [edit, setEdit] = useState(false);

  const { handleUpdate, setUpdateInputVal, updateInputVal } = useUpdateComment(
    commentedUser._id,
    setEdit,
  );
  useEffect(() => {
    if (updateInputVal === '') {
      setUpdateInputVal(commentedUser?.body);
    }
  }, []);

  const handleOnChangeUpdate = (e) => {
    // let updateVal = e.target.value;
    setUpdateInputVal(e);
  };

  return (
    <>
      {edit && currentUserId === commentedUser!.createdBy!._id ? (
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
          threadId={threadId}
          postId={postId}
          setEdit={setEdit}
          showIcon={true}
          itemSlug={itemSlug}
          shareIndex={shareIndex}
          fieldTitle={fieldTitle}
        />
      )}
    </>
  );
}
