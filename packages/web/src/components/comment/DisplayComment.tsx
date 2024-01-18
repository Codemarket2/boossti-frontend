import { useState, useEffect } from 'react';
import { useUpdateComment } from '@frontend/shared/hooks/comment/createComment';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import Typography from '@mui/material/Typography';
import CommentInput from './CommentInput';
import CommentCard from './CommentCard';

interface IDisplayComment {
  parentIds: string[];
  threadId: string;
  handleDelete: (commentId: string, threadId: string) => void;
  comment: any;
  index: number;
  itemSlug?: string;
  shareIndex?: any;
  fieldTitle?: string;
}

export default function DisplayComment({
  parentIds,
  handleDelete,
  comment,
  index,
  threadId,
  itemSlug,
  shareIndex,
  fieldTitle,
}: IDisplayComment) {
  const authorized = useAuthorization([comment?.createdBy?._id]);

  const [edit, setEdit] = useState(false);

  const { handleUpdate, setUpdateInputVal, updateInputVal } = useUpdateComment(
    comment._id,
    setEdit,
  );

  useEffect(() => {
    if (updateInputVal === '') {
      setUpdateInputVal(comment?.body);
    }
  }, []);

  const handleOnChangeUpdate = (e) => {
    setUpdateInputVal(e);
  };

  return (
    <>
      {edit && authorized ? (
        <>
          <Typography>Edit Comment</Typography>
          <CommentInput
            label="Update Comment"
            inputVal={updateInputVal}
            handleChange={handleOnChangeUpdate}
            onClick={handleUpdate}
            onCancel={() => setEdit(false)}
          />
        </>
      ) : (
        <CommentCard
          comment={comment}
          handleDelete={handleDelete}
          index={index}
          threadId={threadId}
          parentIds={parentIds}
          setEdit={setEdit}
          itemSlug={itemSlug}
          shareIndex={shareIndex}
          fieldTitle={fieldTitle}
        />
      )}
    </>
  );
}
