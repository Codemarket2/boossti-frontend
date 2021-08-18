import React, { useState, useEffect } from 'react';
import {
  TextField,
  Grid,
  IconButton,
  CircularProgress,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from '@material-ui/core/';
import SendIcon from '@material-ui/icons/Send';
import produce from 'immer';
import moment from 'moment';

import { useCreateComment } from '@frontend/shared/hooks/comment/createComment';
import { useGetComments } from '@frontend/shared/hooks/comment/getComment';

interface IComment {
  postId: string;
}

export default function Comment({ postId }: IComment) {
  const { handleSave, inputVal, setInputVal } = useCreateComment();
  const { data, error, loading } = useGetComments(postId);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleChange = (e) => {
    let newVal = e.target.value;
    setInputVal(newVal);
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        data &&
        data?.getCommentsByParentID?.data?.map((commentedUser) => (
          <Card key={commentedUser._id} className="my-1" variant="outlined">
            <CardHeader
              avatar={
                <Avatar
                  src={commentedUser?.createdBy?.picture}
                  alt={commentedUser?.createdBy?.name}
                />
              }
              title={commentedUser?.createdBy?.name}
              subheader={
                <span>
                  {moment(commentedUser?.createdAt) > moment().subtract(7, 'days')
                    ? moment(commentedUser?.createdAt).fromNow()
                    : moment(commentedUser?.createdAt).format('LL')}
                </span>
              }
            />
            <Divider />
            <CardContent>{commentedUser?.body}</CardContent>
            {/* {commentedUser?.createdAt} */}
          </Card>
        ))
      )}

      <Grid container alignItems="center">
        <Grid item lg={11} md={11} sm={11} xs={11}>
          <TextField
            variant="standard"
            value={inputVal}
            onChange={handleChange}
            label="add a comment"
            fullWidth
          />
        </Grid>
        <Grid item lg={1} md={1} sm={1} xs={1}>
          <IconButton onClick={() => handleSave(postId)}>
            <SendIcon color="primary" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
