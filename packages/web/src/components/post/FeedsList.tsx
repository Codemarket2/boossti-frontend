import { useGetMyFeeds } from '@frontend/shared/hooks/post';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ErrorLoading from '../common/ErrorLoading';
import PostCard from './PostCard';
import PostForm from './PostForm';
import PostCardSkeleton from './PostCardSkeleton';
import ListHeader from '../common/ListHeader';

export default function FeedsList() {
  const { data, error, loading, state: postsState, setState: postsSetState } = useGetMyFeeds();

  return (
    <div>
      <ListHeader
        loading={loading}
        alwaysHideSearch
        search={postsState.search}
        showSearch={postsState.showSearch}
        onHide={() => postsSetState({ ...postsState, search: '', showSearch: false })}
        onShow={() => postsSetState({ ...postsState, search: '', showSearch: true })}
        onChange={(value) => postsSetState({ ...postsState, search: value })}
      >
        <Typography variant="h4">Feeds</Typography>
      </ListHeader>
      {!postsState.search && (
        <Paper className="px-2 py-1" variant="outlined">
          <PostForm />
        </Paper>
      )}
      {error || !data || !data.getPosts ? (
        <ErrorLoading error={error}>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </ErrorLoading>
      ) : (
        data.getPosts.data.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}
