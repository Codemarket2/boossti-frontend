import Skeleton from '@mui/material/Skeleton';
import { useCreateComment, useDeleteComment } from '@frontend/shared/hooks/comment/createComment';
import { useGetComments } from '@frontend/shared/hooks/comment/getComment';
import CommentInput from './CommentInput';
import DisplayComment from './DisplayComment';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';

interface IComment {
  postId: string;
  threadId: string;
  label?: string;
  showInput?: boolean;
  itemSlug?: string;
  shareIndex?: any;
  fieldTitle?: string;
}

export default function Comment({
  postId,
  label,
  showInput = true,
  threadId,
  itemSlug,
  shareIndex,
  fieldTitle,
}: IComment) {
  const { handleSave, inputVal, setInputVal, loading: submitLoading } = useCreateComment(
    postId,
    threadId,
  );
  const { handleDelete, loading: deleteLoading } = useDeleteComment();
  const { data, error } = useGetComments(postId);

  const handleChange = (e) => {
    setInputVal(e);
  };

  return (
    <>
      {error || !data || !data.getCommentsByParentID ? (
        <ErrorLoading error={error}>
          <Skeleton height={60} />
          <Skeleton height={60} />
        </ErrorLoading>
      ) : (
        data &&
        data?.getCommentsByParentID?.data?.map((commentedUser, index) => (
          <>
            <DisplayComment
              key={commentedUser._id}
              postId={postId}
              threadId={threadId}
              commentedUser={commentedUser}
              index={index}
              handleDelete={handleDelete}
              itemSlug={itemSlug}
              shareIndex={shareIndex}
              fieldTitle={fieldTitle}
            />
          </>
        ))
      )}
      {showInput && (
        <CommentInput
          loading={submitLoading}
          handleChange={handleChange}
          onClick={handleSave}
          inputVal={inputVal}
          label={label}
        />
      )}
      <Backdrop open={deleteLoading || submitLoading} />
    </>
  );
}
