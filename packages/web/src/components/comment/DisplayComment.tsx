import React, { useState, useEffect } from 'react';
import { IconButton, Avatar, Card, CardHeader, CardContent, Divider } from '@material-ui/core/';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { useUpdateComment } from '@frontend/shared/hooks/comment/createComment';
import CommentInput from './CommentInput';

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
      {edit ? (
        <CommentInput
          inputVal={updateInputVal}
          handleChange={handleOnChangeUpdate}
          onClick={handleUpdate}
        />
      ) : (
        <Card key={commentedUser._id} className="my-1" variant="outlined">
          <CardHeader
            avatar={
              <Avatar
                src={commentedUser?.createdBy?.picture}
                alt={commentedUser?.createdBy?.name}
              />
            }
            action={
              <>
                <IconButton aria-label="settings" onClick={() => setEdit(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="settings"
                  onClick={() => handleDelete(commentedUser._id, postId, index)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
            title={commentedUser?.createdBy?.name}
            subheader={
              commentedUser?.updatedAt ? (
                <span>
                  {moment(commentedUser?.updatedAt) > moment().subtract(7, 'days')
                    ? moment(commentedUser?.updatedAt).fromNow()
                    : moment(commentedUser?.updatedAt).format('LL')}
                </span>
              ) : (
                <span>
                  {moment(commentedUser?.createdAt) > moment().subtract(7, 'days')
                    ? moment(commentedUser?.createdAt).fromNow()
                    : moment(commentedUser?.createdAt).format('LL')}
                </span>
              )
            }
          />
          <Divider />
          <CardContent>{commentedUser?.body}</CardContent>
        </Card>
      )}
    </>
  );
}
