import { useUserFeeds } from '@frontend/shared/hooks/post';
import ErrorLoading from '../common/ErrorLoading';
import PostCard from './PostCard';
import PostCardSkeleton from './PostCardSkeleton';
import ListHeader from './ListHeader';

export default function FeedsList({ userId }) {
  const { data, error, loading, state: postsState, setState: postsSetState } = useUserFeeds({
    userId,
  });

  return (
    <div>
      <ListHeader
        search={postsState.search}
        showSearch={postsState.showSearch}
        onHide={() => postsSetState({ ...postsState, search: '', showSearch: false })}
        onShow={() => postsSetState({ ...postsState, search: '', showSearch: true })}
        onChange={(value) => postsSetState({ ...postsState, search: value })}
      />
      {error || !data || !data.getPostsByUserId ? (
        <ErrorLoading error={error}>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </ErrorLoading>
      ) : (
        data.getPostsByUserId.data.map((post) => (
          <PostCard key={post._id} post={post} authenticated={false} />
        ))
      )}
    </div>
  );
}
