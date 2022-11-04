import Skeleton from '@mui/material/Skeleton';
import { useCreateComment, useDeleteComment } from '@frontend/shared/hooks/comment/createComment';
import { useRouter } from 'next/router';
import { useGetComments } from '@frontend/shared/hooks/comment/getComment';
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

  const { data, error, refetch } = useGetComments(threadId, commentIds);
  const { handleSave, inputVal, setInputVal, loading: submitLoading } = useCreateComment({
    parentIds,
    threadId,
    refetch,
    path: router.asPath,
  });
  const { handleDelete, loading: deleteLoading } = useDeleteComment(refetch);

  const handleChange = (e) => {
    setInputVal(e);
  };

  return (
    <div className="pt-1 mb-2">
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
            />
          </div>
        ))
      )}
      {showInput && (
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
      <Backdrop open={deleteLoading || submitLoading} />
    </div>
  );
}
