import React, { useState } from 'react';
import { Card } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Link from 'next/link';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';

import ImageList from './ImageList';
import MentionParser from '../common/MentionParser';
import CommentLikeShare from '../comment/CommentLikeShare';

interface IProps {
  post: any;
  onClickMore?: (arg1: any, arg2: any) => void;
  authenticated?: boolean;
}

export default function PostCard({ post, onClickMore = () => null, authenticated = true }: IProps) {
  return (
    <>
      <Card className="my-3" variant="outlined">
        <CardHeader
          avatar={
            <Avatar
              aria-label="author"
              data-testid="author-picture"
              alt={post.createdBy.name}
              src={post.createdBy.picture}
            />
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={(event) => onClickMore(event.currentTarget, post)}
              size="large"
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Link href={`/user/${post.createdBy._id}`}>
              <a data-testid="author-name">{post.createdBy.name}</a>
            </Link>
          }
          subheader={
            <span data-testid="post-timestamp">
              {moment(post.createdAt) > moment().subtract(7, 'days')
                ? moment(post.createdAt).fromNow()
                : moment(post.createdAt).format('LL')}
            </span>
          }
        />
        <CardContent>
          <div data-testid="post-body">
            <MentionParser
              tags={post.tags}
              value={post.body}
              className="mb-1"
              authenticated={authenticated}
            />
          </div>
          <ImageList media={post.media} authenticated={authenticated} />
        </CardContent>
        <CardActions disableSpacing>
          <CommentLikeShare threadId={post._id} />
        </CardActions>
      </Card>
    </>
  );
}
