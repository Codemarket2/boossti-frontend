import React, { useState, useEffect } from 'react';
import { TextField, Grid, IconButton } from '@material-ui/core/';
import SendIcon from '@material-ui/icons/Send';

interface IComment {
  inputVal: string;
  onClick: any;
  postId?: string;
  handleChange: any;
  label?: string;
}
export default function CommentInput({
  label = 'add a comment',
  handleChange,
  inputVal,
  onClick,
  postId,
}: IComment) {
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item lg={11} md={11} sm={11} xs={11}>
          <TextField
            variant="standard"
            value={inputVal}
            onChange={handleChange}
            label={label}
            fullWidth
            name="comment"
          />
        </Grid>
        <Grid item lg={1} md={1} sm={1} xs={1}>
          <IconButton onClick={onClick} data-testid="add-comment">
            <SendIcon color="primary" />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}
