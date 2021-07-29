import ClearIcon from '@material-ui/icons/Clear';
import { useUserFeeds } from '@frontend/shared/hooks/post';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ErrorLoading from '../common/ErrorLoading';
import PostCard from './PostCard';
import PostCardSkeleton from './PostCardSkeleton';
import { useSelector } from 'react-redux';

export default function FeedsList({ userId }) {
  const { data, error, loading, state: postsState, setState: postsSetState } = useUserFeeds({
    userId,
  });

  const authenticated = useSelector(({ auth }: any) => auth.authenticated);

  return (
    <div>
      <Paper
        className="my-2 d-flex justify-content-end align-items-center"
        variant="outlined"
        style={{ minHeight: 55 }}>
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
