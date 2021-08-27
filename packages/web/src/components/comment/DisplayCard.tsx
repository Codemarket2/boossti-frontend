import React from 'react';
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
import { useSelector } from 'react-redux';
interface IDisplayComment {
  commentedUser: any;
  handleDelete: any;
  setEdit: any;
  postId: string;
  index: number;
  setReplyOnComment?: any;
  showIcon?: boolean;
}
export default function DisplayCard({
  showIcon = false,
  commentedUser,
  handleDelete,
  setEdit,
  postId,
  index,
  setReplyOnComment,
}: IDisplayComment) {
  const { attributes, admin } = useSelector(({ auth }: any) => auth);
  const currentUserId = attributes['custom:_id'];
  return (
    <>
      <Card key={commentedUser._id} className="my-1" variant="outlined">
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
              {currentUserId === commentedUser._id ? (
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
                    <IconButton aria-label="settings" onClick={() => setReplyOnComment(true)}>
                      <ReplyIcon />
                    </IconButton>
                  )}
                </>
              ) : (
                <>
                  {showIcon && (
                    <IconButton aria-label="settings" onClick={() => setReplyOnComment(true)}>
                      <ReplyIcon />
                    </IconButton>
                  )}
                </>
              )}
            </>
          }
          title={<span data-testid="author-name">commentedUser?.createdBy?.name</span>}
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
      </Card>
    </>
  );
}
