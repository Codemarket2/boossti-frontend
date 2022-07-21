import React from 'react';
import { Container } from '@mui/material';
import { useGetComment } from '@frontend/shared/hooks/comment/getComment';
import CommentsList from '../components/comment/CommentsList';
import PostCardSkeleton from '../components/post/PostCardSkeleton';
import ErrorLoading from '../components/common/ErrorLoading';

export default function CommentScreen({ _id }: { _id: string }) {
  const { data, error } = useGetComment(_id);
  return (
    <Container>
      {error || !data?.getComment ? (
        <ErrorLoading error={error}>
          <PostCardSkeleton />
        </ErrorLoading>
      ) : (
        <CommentsList parentIds={data.getComment.parentId} threadId={data.getComment.parentId} />
      )}
    </Container>
  );
}
