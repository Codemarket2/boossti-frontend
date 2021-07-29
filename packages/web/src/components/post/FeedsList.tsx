import { useGetMyFeeds } from '@frontend/shared/hooks/post';
import ClearIcon from '@material-ui/icons/Clear';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ErrorLoading from '../common/ErrorLoading';
import PostCard from './PostCard';
import PostForm from './PostForm';
import PostCardSkeleton from './PostCardSkeleton';

export default function FeedsList() {
  const { data, error, loading, state: postsState, setState: postsSetState } = useGetMyFeeds();

  return (
    <div>
      <Paper
        className="my-2 d-flex justify-content-between align-items-center"
        variant="outlined"
        style={{ minHeight: 55 }}>
        <Typography variant="h4" className="mx-3">
          Feeds
        </Typography>
        {postsState.showSearch ? (
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            label="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" role="button">
                  <IconButton
                    className="mr-n3"
                    onClick={() => postsSetState({ ...postsState, search: '', showSearch: false })}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={postsState.search}
            onChange={({ target: { value } }) => postsSetState({ ...postsState, search: value })}
          />
        ) : (
          <IconButton
            onClick={() => postsSetState({ ...postsState, search: '', showSearch: true })}>
            <SearchIcon />
          </IconButton>
        )}
      </Paper>
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
