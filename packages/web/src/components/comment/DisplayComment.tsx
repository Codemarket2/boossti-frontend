import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
} from '@material-ui/core/';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReplyIcon from '@material-ui/icons/Reply';

import { useUpdateComment } from '@frontend/shared/hooks/comment/createComment';
import CommentInput from './CommentInput';
import DisplayCard from './DisplayCard';
import ReplyComment from './ReplyComment';

interface IDisplayComment {
  postId: string;
  handleDelete: any;
  commentedUser: any;
  index: number;
}

export default function DisplayComment({
  postId,
  handleDelete,
  commentedUser,
  index,
}: IDisplayComment) {
  const [edit, setEdit] = useState(false);
  const [replyOnComment, setReplyOnComment] = useState(true);
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

  console.log(updateInputVal);
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
          setReplyOnComment={setReplyOnComment}
        />
      )}
      <ReplyComment />
    </>
  );
}
