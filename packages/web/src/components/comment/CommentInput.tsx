import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core/';
import dynamic from 'next/dynamic';

const RichTextarea = dynamic(() => import('../common/RichTextarea'), { ssr: false });

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
  const _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (inputVal !== '') {
        onClick();
      }
    }
  };

  return (
    <div>
      <Grid container alignItems="center" spacing={1}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <RichTextarea onChange={handleChange} value={inputVal} />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Button onClick={onClick} data-testid="add-comment" variant="contained" color="primary">
            add comment
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
