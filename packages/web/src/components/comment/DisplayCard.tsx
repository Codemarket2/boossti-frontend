import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Typography,
  Container,
} from '@material-ui/core/';
import parse from 'html-react-parser';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useSelector } from 'react-redux';

import { Comment } from 'semantic-ui-react';

import CommentUI from './Comment';

interface IDisplayComment {
  commentedUser: any;
  handleDelete: any;
  setEdit: any;
  postId: string;
  index: number;
  showIcon?: boolean;
}
export default function DisplayCard({
  showIcon = false,
  commentedUser,
  handleDelete,
  setEdit,
  postId,
  index,
}: IDisplayComment) {
  const { attributes } = useSelector(({ auth }: any) => auth);

  const [showReply, setShowReply] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(true);

  const currentUserId = attributes['custom:_id'];
  useEffect(() => {
    setShowReply(true);
    setShowCommentInput(false);
  }, []);
  return (
    <Comment.Group threaded>
      <Comment>
        <Comment.Avatar
          className="ui circular image"
          data-testid="author-profile"
          src={commentedUser?.createdBy?.picture}
          alt={commentedUser?.createdBy?.name}
        />
        <Comment.Content>
          <Comment.Author as="a" data-testid="author-name">
            {commentedUser?.createdBy?.name}
          </Comment.Author>
          <Comment.Metadata>
            <div>
              {commentedUser?.updatedAt ? (
                <span>
                  {moment(commentedUser?.updatedAt) > moment().subtract(7, 'days')
                    ? moment(commentedUser?.updatedAt).fromNow()
                    : moment(commentedUser?.updatedAt).format('LL')}
                </span>
              ) : (
                <span data-testid="created-timestamp">
                  {moment(commentedUser?.createdAt) > moment().subtract(7, 'days')
                    ? moment(commentedUser?.createdAt).fromNow()
                    : moment(commentedUser?.createdAt).format('LL')}
                </span>
              )}
            </div>
          </Comment.Metadata>
          <Comment.Text data-testid="comment-body">{parse(commentedUser?.body)}</Comment.Text>
          <Comment.Actions>
            {currentUserId === commentedUser!.createdBy!._id ? (
              <>
                <Comment.Action>
                  <span onClick={() => console.log('heelo')}>Like</span>
                </Comment.Action>
                {showIcon && (
                  <Comment.Action>
                    <span
                      onClick={() => {
                        setShowReply(!showReply);
                        setShowCommentInput(true);
                      }}>
                      Comment
                    </span>
                  </Comment.Action>
                )}

                <Comment.Action>
                  <span onClick={() => setEdit(true)}>Edit</span>
                </Comment.Action>
                <Comment.Action>
                  <span
                    data-testid="btn-delete"
                    onClick={() => handleDelete(commentedUser._id, postId, index)}>
                    Delete
                  </span>
                </Comment.Action>
              </>
            ) : (
              <>
                {showIcon && (
                  <Comment.Action>
                    <Comment.Action>
                      <span onClick={() => console.log('heelo')}>Like</span>
                    </Comment.Action>
                    <Comment.Action>
                      <span
                        onClick={() => {
                          setShowReply(!showReply);
                          setShowCommentInput(true);
                        }}>
                        Comment
                      </span>
                    </Comment.Action>
                  </Comment.Action>
                )}
              </>
            )}
          </Comment.Actions>
        </Comment.Content>
        {showReply && (
          <CommentUI
            postId={commentedUser._id}
            label="Add Reply on Comment"
            showInput={showCommentInput}
          />
        )}
      </Comment>
    </Comment.Group>
  );
}

{
  /* <Card key={commentedUser._id} className="my-1" variant="outlined">
        <CardHeader
          avatar={
            <Avatar
              data-testid="author-profile"
              src={commentedUser?.createdBy?.picture}
              alt={commentedUser?.createdBy?.name}
            />
          }
          action={
            <>
              {currentUserId === commentedUser!.createdBy!._id ? (
                <>
                  <IconButton aria-label="settings" onClick={() => setEdit(true)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    data-testid="btn-delete"
                    aria-label="settings"
                    onClick={() => handleDelete(commentedUser._id, postId, index)}>
                    <DeleteIcon />
                  </IconButton>
                  {showIcon && (
                    <IconButton
                      aria-label="settings"
                      onClick={() => {
                        setShowReply(!showReply);
                        setShowCommentInput(true);
                      }}>
                      <ReplyIcon />
                    </IconButton>
                  )}
                </>
              ) : (
                <>
                  {showIcon && (
                    <IconButton
                      aria-label="settings"
                      onClick={() => {
                        setShowReply(!showReply);
                        setShowCommentInput(true);
                      }}>
                      <ReplyIcon />
                    </IconButton>
                  )}
                </>
              )}
            </>
          }
          title={<span data-testid="author-name">{commentedUser?.createdBy?.name}</span>}
          subheader={
            commentedUser?.updatedAt ? (
              <span>
                {moment(commentedUser?.updatedAt) > moment().subtract(7, 'days')
                  ? moment(commentedUser?.updatedAt).fromNow()
                  : moment(commentedUser?.updatedAt).format('LL')}
              </span>
            ) : (
              <span data-testid="created-timestamp">
                {moment(commentedUser?.createdAt) > moment().subtract(7, 'days')
                  ? moment(commentedUser?.createdAt).fromNow()
                  : moment(commentedUser?.createdAt).format('LL')}
              </span>
            )
          }
        />
        <Divider />
        <CardContent data-testid="comment-body">{commentedUser?.body}</CardContent>
        {showReply && (
          <Grid style={{ marginLeft: '25px', marginTop: '10px' }}>
            <Divider orientation="vertical" variant="inset" />
            <Comment
              postId={commentedUser._id}
              label="Add Reply on Comment"
              showInput={showCommentInput}
            />
          </Grid>
        )}
      </Card> */
}
