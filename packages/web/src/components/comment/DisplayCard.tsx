import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Comment } from 'semantic-ui-react';

import { useGetLikes } from '@frontend/shared/hooks/like/getLike';
import { useGetActionCounts } from '@frontend/shared/hooks/comment/getComment';
import CommentUI from './Comment';
import ErrorLoading from '../common/ErrorLoading';
import Like from '../like/Like';
import LikeModal from '../like/LikeModal';

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
          {open && (
            <LikeModal
              open={open}
              handleOpenLikeModal={handleOpenLikeModal}
              handleCloseLikeModal={handleCloseLikeModal}
              totalLike={likeData!.getLikesByParentId!.data!.length}
              data={likeData!.getLikesByParentId!.data}
            />
          )}
          <Comment.Actions>
            {error || !payload || !payload!.getActionCounts ? (
              <ErrorLoading error={error} />
            ) : (
              <Comment.Action>
                <Like
                  likedByUser={payload!.getActionCounts!.likedByUser}
                  parentId={commentedUser._id}
                  commentLike={true}
                />
              </Comment.Action>
            )}
            {!likeData || !likeData!.getLikesByParentId!.data || likeError ? (
              <ErrorLoading error={likeError} />
            ) : (
              <Comment.Action onClick={handleOpenLikeModal}>
                Like &nbsp;
                {likeData!.getLikesByParentId!.data!.length === 0
                  ? ''
                  : likeData!.getLikesByParentId!.data!.length}
              </Comment.Action>
            )}

            {currentUserId === commentedUser!.createdBy!._id ? (
              <>
                {showIcon && (
                  <>
                    {error || !payload || !payload!.getActionCounts ? (
                      <ErrorLoading error={error} />
                    ) : (
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
                          Comment &nbsp;
                          {payload &&
                            (payload!.getActionCounts!.commentCount === 0 ? (
                              ''
                            ) : (
                              <b>
                                {payload!.getActionCounts!.commentCount &&
                                  payload!.getActionCounts!.commentCount}
                              </b>
                            ))}
                        </span>
                      </Comment.Action>
                    )}
                  </>
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
                    {error || !payload || !payload!.getActionCounts ? (
                      <ErrorLoading error={error} />
                    ) : (
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
                          Comment
                          {payload &&
                            (payload!.getActionCounts!.commentCount === 0 ? (
                              ''
                            ) : (
                              <b>
                                {payload!.getActionCounts!.commentCount &&
                                  payload!.getActionCounts!.commentCount}
                              </b>
                            ))}
                        </span>
                      </Comment.Action>
                    )}
                    <Comment.Action>
                      <span data-testid="btn-delete" onClick={() => console.log('share')}>
                        Share
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
