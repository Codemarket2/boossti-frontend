import { useGetMyFeeds } from '@frontend/shared/hooks/post';
import { useCreateBookmark } from '@frontend/shared/hooks/boomark';
// import Button from '@material-ui/core/Button';
// import Link from 'next/link';
import Backdrop from '../common/Backdrop';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Chip from '@material-ui/core/Chip';
import ClearIcon from '@material-ui/icons/Clear';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ErrorLoading from '../common/ErrorLoading';
import Loading from '../common/Loading';
import { onAlert } from '../../utils/alert';
import PostCard from './PostCard';
import PostForm from './PostForm';
import PostCardSkeleton from './PostCardSkeleton';

export default function FeedsList() {
  const { handleBookmark, state: bookmarkState, setState: bookmarkSetState } = useCreateBookmark({
    onAlert,
  });
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
      <Backdrop open={bookmarkState.saveTagLoading} />
      {!postsState.search && (
        <Paper className="px-2 py-1" variant="outlined">
          <PostForm />
        </Paper>
      )}
      {/* <div className="text-right">
        <Link href="/create-post">
          <Button variant="contained" color="primary">
            Create Post
          </Button>
        </Link>
      </div> */}
      {error || !data || !data.getPosts ? (
        <ErrorLoading error={error}>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </ErrorLoading>
      ) : (
        <>
          {loading && <Loading />}
          {data.getPosts.data.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onClickTag={(target: any, tag: any) =>
                bookmarkSetState({ ...bookmarkState, showMenu: target, selectedTag: tag })
              }
            />
          ))}
        </>
      )}
      <Menu
        anchorEl={bookmarkState.showMenu}
        keepMounted
        open={Boolean(bookmarkState.showMenu)}
        onClose={() => bookmarkSetState({ ...bookmarkState, showMenu: null, selectedTag: null })}>
        <MenuItem>
          <Chip
            role="button"
            color="primary"
            label={(bookmarkState.selectedTag && bookmarkState.selectedTag.text) || ''}
          />
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={async () => {
            await handleBookmark();
            alert('tag saved');
          }}>
          <ListItemIcon className="mr-n4">
            <BookmarkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Save Tag" />
        </MenuItem>
      </Menu>
    </div>
  );
}
