import React from 'react';
import { Container } from '@mui/material';
import { useGetComment } from '@frontend/shared/hooks/comment/getComment';
import Comment from '../components/comment/Comment';
import PostCardSkeleton from '../components/post/PostCardSkeleton';
import ErrorLoading from '../components/common/ErrorLoading';

export default function CommentScreen({ _id }) {
  const { data, error, loading } = useGetComment(_id);
  return (
    <Container>
      {error || !data || !data!.getComment ? (
        <ErrorLoading error={error}>
          <PostCardSkeleton />
        </ErrorLoading>
      ) : (
        <Comment postId={data.getComment.parentId} threadId={data.getComment.parentId} />
      )}
    </Container>
  );
}
