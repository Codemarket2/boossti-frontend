import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Comment } from 'semantic-ui-react';

import CommentUI from './Comment';
import { useGetActionCounts } from '@frontend/shared/hooks/comment/getComment';
import { useCreateLike, useDeleteLike } from '@frontend/shared/hooks/like/createLike';
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
  //comment state
  const [showReply, setShowReply] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(true);
  const { data: actionCountData, error } = useGetActionCounts(commentedUser._id);
  const [payload, setPayload] = useState<any>();
  //like state
  const { handleLiked } = useCreateLike(commentedUser._id);
  const { handleLikeDelete } = useDeleteLike();
  const [liked, setLiked] = useState(false);

  const currentUserId = attributes['custom:_id'];
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
          <Comment.Actions>
            {error || !payload || !payload!.getActionCounts ? (
              <ErrorLoading error={error} />
            ) : (
              <Comment.Action onClick={() => console.log('heelo')}>
                Like
                {payload &&
                  (payload!.getActionCounts!.likeCount === 0 ? (
                    ''
                  ) : (
                    <b>
                      {payload!.getActionCounts!.likeCount && payload!.getActionCounts!.likeCount}
                    </b>
                  ))}
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
                  <span data-testid="btn-delete" onClick={() => console.log('share')}>
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
