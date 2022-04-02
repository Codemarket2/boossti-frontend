import React, { useEffect, useState } from 'react';
import { Comment, Segment } from 'semantic-ui-react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useGetComment } from '@frontend/shared/hooks/comment/getComment';
import ErrorLoading from '../common/ErrorLoading';
import DisplayRichText from '../common/DisplayRichText';

interface IProps {
  _id: string;
  itemSlug?: string;
  fieldTitle?: string;
  setShowHideComments?: any;
}

//   _id = '615bef9f24ff8e0008f5d8c9',
export default function SingleComment({ _id, itemSlug, fieldTitle, setShowHideComments }: IProps) {
  const { query } = useRouter();
  const [showSingleComment, setShowSingleComment] = useState(false);
  const { data, error, loading } = useGetComment(_id);
  useEffect(() => {
    if (query?.commentId && query?.field && query?.fieldTitle) {
      if (
        (query.commentId as string) === _id &&
        itemSlug === query.field &&
        fieldTitle === query.fieldTitle
      ) {
        setShowSingleComment(true);
      }
    }
  }, []);
  return (
    <>
      {showSingleComment && (
        <>
          {error || !data || !data!.getComment ? (
            <ErrorLoading error={error} />
          ) : (
            <Segment>
              <Comment.Group threaded>
                <Comment>
                  <Comment.Avatar
                    className="ui circular image"
                    src={data?.getComment?.createdBy?.picture}
                    alt={data?.getComment?.createdBy?.name}
                  />
                  <Comment.Content>
                    <Comment.Author as="a" data-testid="author-name">
                      {data?.getComment?.createdBy?.name}
                    </Comment.Author>
                    <Comment.Metadata>
                      {data?.getComment?.updatedAt ? (
                        <span>
                          {moment(data?.getComment?.updatedAt) > moment().subtract(7, 'days')
                            ? moment(data?.getComment?.updatedAt).fromNow()
                            : moment(data?.getComment?.updatedAt).format('LL')}
                        </span>
                      ) : (
                        <span data-testid="created-timestamp">
                          {moment(data?.getComment?.createdAt) > moment().subtract(7, 'days')
                            ? moment(data?.getComment?.createdAt).fromNow()
                            : moment(data?.getComment?.createdAt).format('LL')}
                        </span>
                      )}
                    </Comment.Metadata>
                    <Comment.Text data-testid="comment-body">
                      <DisplayRichText value={data?.getComment?.body} />
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action
                        onClick={() => {
                          setShowHideComments(true);
                          setShowSingleComment(false);
                        }}
                      >
                        Show all comments
                      </Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Segment>
          )}
        </>
      )}
    </>
  );
}
