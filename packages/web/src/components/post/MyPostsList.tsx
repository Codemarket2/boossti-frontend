import React from 'react';
import { useGetMyPosts } from '@frontend/shared/hooks/post';
import ErrorLoading from '../common/ErrorLoading';
import PostCard from './PostCard';

export default function MyPostsList() {
  const { data, error, loading } = useGetMyPosts();

  if (error || loading || !data || !data.getMyPosts) {
    return <ErrorLoading error={error} loading={loading} />;
  }
  return (
    <div>
      {data.getMyPosts.data.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
