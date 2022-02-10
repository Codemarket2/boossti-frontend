import React, { useState } from 'react';
import { Card } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Link from 'next/link';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';

import ImageList from './ImageList';
import MentionParser from '../common/MentionParser';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';
interface IProps {
  post: any;
  onClickMore?: (arg1: any, arg2: any) => void;
  authenticated?: boolean;
}

export default function PostCard({ post, onClickMore = () => {}, authenticated = true }: IProps) {
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
          <CommentLikeShare parentId={post._id} />
        </CardActions>
      </Card>
    </>
  );
}
