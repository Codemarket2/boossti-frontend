import React from 'react';
import { Container } from '@mui/material';
import { useGetPost } from '@frontend/shared/hooks/post';
import PostCard from '../../src/components/post/PostCard';
import PostCardSkeleton from '../../src/components/post/PostCardSkeleton';
import ErrorLoading from '../../src/components/common/ErrorLoading';

export default function PostScreen({ _id }) {
  const { loading, data, error } = useGetPost(_id);
  return (
    <Container>
      {error || !data || !data!.getPost ? (
        <ErrorLoading error={error}>
          <PostCardSkeleton />
        </ErrorLoading>
      ) : (
        <PostCard post={data!.getPost} />
      )}
    </Container>
  );
}
