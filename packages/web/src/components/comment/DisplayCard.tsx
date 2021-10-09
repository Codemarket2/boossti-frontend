import React, { useState, useEffect } from 'react';
import { Comment } from 'semantic-ui-react';
import parse from 'html-react-parser';
import moment from 'moment';
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';

import { useGetLikes } from '@frontend/shared/hooks/like/getLike';
import { useGetActionCounts } from '@frontend/shared/hooks/comment/getComment';
import CommentUI from './Comment';
import Like from '../like/Like';
import LikeModal from '../like/LikeModal';
import 'semantic-ui-css/semantic.min.css';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';

interface IDisplayComment {
  commentedUser: any;
  handleDelete: any;
  setEdit: any;
  threadId: string;
  postId: string;
  index: number;
  showIcon?: boolean;
  itemSlug?: string;
  shareIndex?: any;
  fieldTitle?: string;
}
export default function DisplayCard({
  showIcon = false,
  commentedUser,
  handleDelete,
  setEdit,
  postId,
  threadId,
  index,
  itemSlug,
  shareIndex,
  fieldTitle,
}: IDisplayComment) {
  const { attributes } = useSelector(({ auth }: any) => auth);
  //comment
  const [showReply, setShowReply] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(true);
  const { data: actionCountData, error } = useGetActionCounts(commentedUser._id);
  const [payload, setPayload] = useState<any>();
  const currentUserId = attributes['custom:_id'];
  //like
  const { data: likeData, error: likeError } = useGetLikes(commentedUser._id);
  // like modal state
  const [open, setOpen] = useState(false);
  const handleOpenLikeModal = () => {
    setOpen(true);
  };
  const handleCloseLikeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    setPayload(actionCountData);
  }, [actionCountData]);

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
          {/* {open && (
            <LikeModal
              open={open}
              handleOpenLikeModal={handleOpenLikeModal}
              handleCloseLikeModal={handleCloseLikeModal}
              totalLike={likeData!.getLikesByParentId!.data!.length}
              parentId={commentedUser._id}
            />
          )} */}
          <Comment.Actions>
            {/* <Comment.Action>
              <Like
                likedByUser={actionCountData?.getActionCounts?.likedByUser}
                parentId={commentedUser._id}
                commentLike={true}
              />
            </Comment.Action>
            {actionCountData?.getActionCounts?.likeCount ? (
              <Comment.Action onClick={handleOpenLikeModal}>
                {actionCountData?.getActionCounts?.likeCount} Likes
              </Comment.Action>
            ) : null}
            {currentUserId === commentedUser!.createdBy!._id ? (
              <>
                {showIcon && (
                  <Comment.Action>
                    <span
                      style={{
                        fontWeight: showReply ? 'bold' : 'normal',
                        color: showReply && 'rgb(17, 82, 147)',
                      }}
                      onClick={() => {
                        setShowReply(!showReply);
                        setShowCommentInput(true);
                      }}>
                      {actionCountData?.getActionCounts?.commentCount
                        ? `${actionCountData.getActionCounts.commentCount} Comments`
                        : 'Comment'}
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
                <Comment.Action>
                  <span data-testid="btn-share" onClick={() => console.log('share')}>
                    Share
                  </span>
                </Comment.Action>
              </>
            ) : (
              <>
                {showIcon && (
                  <Comment.Action>
                    <Comment.Action>
                      <span
                        style={{
                          fontWeight: showReply ? 'bold' : 'normal',
                          color: showReply && 'rgb(17, 82, 147)',
                        }}
                        onClick={() => {
                          setShowReply(!showReply);
                          setShowCommentInput(true);
                        }}>
                        {actionCountData?.getActionCounts?.commentCount
                          ? `${actionCountData.getActionCounts.commentCount} Comments`
                          : 'Comment'}
                      </span>
                    </Comment.Action>
                    <Comment.Action>
                      <span data-testid="btn-delete" onClick={() => console.log('share')}>
                        Share
                      </span>
                    </Comment.Action>
                  </Comment.Action>
                )}
              </>
            )} */}

            <Comment.Action>
              <CommentLikeShare
                parentId={commentedUser._id}
                showDivider={false}
                commentId={commentedUser._id}
                itemSlug={itemSlug}
                index={shareIndex}
                fieldTitle={fieldTitle}>
                {currentUserId === commentedUser!.createdBy!._id && (
                  <>
                    <IconButton onClick={() => setEdit(true)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(commentedUser._id, postId, index)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </CommentLikeShare>
            </Comment.Action>
          </Comment.Actions>
        </Comment.Content>
        {showReply && (
          <CommentUI
            threadId={threadId}
            postId={commentedUser._id}
            label="Add Reply on Comment"
            showInput={showCommentInput}
          />
        )}
      </Comment>
    </Comment.Group>
  );
}
