import Skeleton from '@mui/material/Skeleton';
import { useCreateComment, useDeleteComment } from '@frontend/shared/hooks/comment/createComment';
import { useRouter } from 'next/router';
import { useGetComments, useGetActionCounts } from '@frontend/shared/hooks/comment/getComment';
import { useState } from 'react';
import CommentInput from './CommentInput';
import DisplayComment from './DisplayComment';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';

interface IComment {
  parentIds?: string[];
  threadId: string;
  label?: string;
  showInput?: boolean;
  itemSlug?: string;
  shareIndex?: any;
  fieldTitle?: string;
}

export default function CommentsList({
  parentIds = [],
  label,
  showInput = true,
  threadId,
  itemSlug,
  shareIndex,
  fieldTitle,
}: IComment) {
  const router = useRouter();
  let commentIds = [];
  if (router?.query?.childThreadId) {
    commentIds = Array.isArray(router?.query?.childThreadId)
      ? router?.query?.childThreadId
      : [router?.query?.childThreadId];
  }
  if (router?.query?.commentId) {
    commentIds = [...commentIds, router?.query?.commentId];
  }

  const { data, error, refetch: refetchComments } = useGetComments(threadId, commentIds);

  const { refetch: refetchCommentCount } = useGetActionCounts(threadId);

  const { handleSave, inputVal, setInputVal, loading: submitLoading } = useCreateComment({
    parentIds,
    threadId,
    refetch: refetchComments,
    path: router.asPath,
  });
  const { handleDelete, loading: deleteLoading } = useDeleteComment(
    refetchComments,
    refetchCommentCount,
  );

  const handleChange = (e) => {
    setInputVal(e);
  };
  const [hideParentCommentInput, setHideParentCommentInput] = useState(false);

  return (
    <div className="pt-1 mb-2">
      {showInput && !hideParentCommentInput && (
        <div>
          <CommentInput
            loading={submitLoading}
            handleChange={handleChange}
            onClick={handleSave}
            inputVal={inputVal}
            label={label}
          />
        </div>
      )}
      <div
        style={{
          overflow: 'auto',
          maxHeight: '100vh',
        }}
      >
        {error || !data?.getCommentsByThreadId ? (
          <ErrorLoading error={error}>
            <Skeleton height={60} />
            <Skeleton height={60} />
          </ErrorLoading>
        ) : (
          data?.getCommentsByThreadId?.data?.map((comment, index) => (
            <div>
              <DisplayComment
                key={comment._id}
                parentIds={parentIds}
                threadId={threadId}
                comment={comment}
                index={index}
                handleDelete={handleDelete}
                itemSlug={itemSlug}
                shareIndex={shareIndex}
                fieldTitle={fieldTitle}
                // toggling the state of Parent Comment Input
                setHideParentCommentInput={setHideParentCommentInput}
              />
            </div>
          ))
        )}
      </div>

      <Backdrop open={deleteLoading || submitLoading} />
    </div>
  );
}
