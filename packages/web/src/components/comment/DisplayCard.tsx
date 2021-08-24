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

interface IDisplayComment {
  commentedUser: any;
  handleDelete: any;
  setEdit: any;
  postId: string;
  index: number;
  setReplyOnComment: any;
}
export default function DisplayCard({
  commentedUser,
  handleDelete,
  setEdit,
  postId,
  index,
  setReplyOnComment,
}: IDisplayComment) {
  return (
    <>
      <Card key={commentedUser._id} className="my-1" variant="outlined">
        <CardHeader
          avatar={
            <Avatar src={commentedUser?.createdBy?.picture} alt={commentedUser?.createdBy?.name} />
          }
          action={
            <>
              {commentedUser._id ? (
                <>
                  <IconButton aria-label="settings" onClick={() => setEdit(true)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="settings"
                    onClick={() => handleDelete(commentedUser._id, postId, index)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="settings" onClick={() => setReplyOnComment(true)}>
                    <ReplyIcon />
                  </IconButton>
                </>
              ) : (
                <IconButton aria-label="settings" onClick={() => setReplyOnComment(true)}>
                  <ReplyIcon />
                </IconButton>
              )}
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
    </>
  );
}
