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
import { useGetCommentCount } from '@frontend/shared/hooks/comment/getComment';
import ErrorLoading from '../common/ErrorLoading';

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
  const { data, error, loading } = useGetCommentCount(commentedUser._id);
  if (!data || error || !data.getCommentCount) {
    return <ErrorLoading error={error} />;
  }

  const currentUserId = attributes['custom:_id'];
  useEffect(() => {
    // setShowReply(true);
    // setShowCommentInput(false);
  }, []);
  return (
    <Comment.Group threaded>
      <Comment>
        <Comment.Avatar
          data-testid="author-profile"
          className="ui circular image"
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
          <Comment.Text data-testid="comment-body">
            <div className="ck-content">{parse(commentedUser?.body)}</div>
          </Comment.Text>
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
                      <b>{data!.getCommentCount!.count}</b>
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
