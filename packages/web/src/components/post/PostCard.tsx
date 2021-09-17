import { useState } from 'react';
import { Card, Divider } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Link from 'next/link';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import Badge from '@material-ui/core/Badge';
import moment from 'moment';

import { useGetCommentCount } from '@frontend/shared/hooks/comment/getComment';
import ImageList from './ImageList';
import MentionParser from '../common/MentionParser';
import Comment from '../comment/Comment';
import ErrorLoading from '../common/ErrorLoading';
import Like from '../like/Like';

interface IProps {
  post: any;
  onClickMore?: (arg1: any, arg2: any) => void;
  authenticated?: boolean;
}

export default function PostCard({ post, onClickMore = () => {}, authenticated = true }: IProps) {
  const [showCommentSection, setShowCommentSection] = useState(false);
  const { data, error, loading } = useGetCommentCount(post._id);
  const [Liked, setLiked] = useState(false);
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
              onClick={(event) => onClickMore(event.currentTarget, post)}>
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
          {/* <IconButton aria-label="like" onClick={() => console.log('object')}>
            <FavoriteIcon/>
          </IconButton> */}
          <Like parentId={post._id} />
          {error || !data || !data.getCommentCount ? (
            <ErrorLoading error={error} />
          ) : (
            <IconButton
              aria-label="comment"
              onClick={() => setShowCommentSection(!showCommentSection)}>
              <Badge badgeContent={data!.getCommentCount!.count} color="primary">
                <ModeCommentIcon />
              </Badge>
            </IconButton>
          )}

          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
        {showCommentSection && (
          <>
            <Divider />
            <CardContent>
              <Comment postId={post._id} />
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
}
