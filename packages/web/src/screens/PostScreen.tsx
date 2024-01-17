import { Container } from '@mui/material';
import { useGetPost } from '@frontend/shared/hooks/post';
import PostCard from '../components/post/PostCard';
import PostCardSkeleton from '../components/post/PostCardSkeleton';
import ErrorLoading from '../components/common/ErrorLoading';

export default function PostScreen({ _id }: { _id: string }) {
  const { data, error } = useGetPost(_id);
  return (
    <Container>
      {error || !data?.getPost ? (
        <ErrorLoading error={error}>
          <PostCardSkeleton />
        </ErrorLoading>
      ) : (
        <PostCard post={data?.getPost} />
      )}
    </Container>
  );
}
