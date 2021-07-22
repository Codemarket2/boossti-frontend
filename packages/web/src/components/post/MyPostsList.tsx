import { useGetMyPosts } from '@frontend/shared/hooks/post';
import { useCreateBookmark } from '@frontend/shared/hooks/boomark';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Loading from '../common/Loading';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';
import PostCard from './PostCard';
import PostEditForm from './PostEditForm';
import PostCardSkeleton from './PostCardSkeleton';

export default function MyPostsList() {
  const { handleBookmark, state: bookmarkState, setState: bookmarkSetState } = useCreateBookmark({
    onAlert,
  });

  const {
    data,
    error,
    loading,
    state: postsState,
    setState: postsSetState,
    handleDeletePost,
    deletePostLoading,
  } = useGetMyPosts({
    onAlert,
  });

  return (
    <div>
      <PostEditForm
        open={postsState.showEditModal}
        onClose={() =>
          postsSetState({ ...postsState, showEditModal: false, selectedPost: null, showMenu: null })
        }
        post={postsState.selectedPost}
      />
      <Backdrop open={bookmarkState.saveTagLoading || deletePostLoading} />
      <Paper
        className="my-2 d-flex justify-content-between align-items-center"
        style={{ minHeight: 55 }}>
        <Link href="/create-post">
          <Button className="mx-3" variant="contained" color="primary">
            Create Post
          </Button>
        </Link>
        {postsState.showSearch ? (
          <TextField
            size="small"
            className="w-75"
            // fullWidth
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
      {error || !data || !data.getMyPosts ? (
        <ErrorLoading error={error}>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </ErrorLoading>
      ) : (
        <>
          {loading && <Loading />}
          {data.getMyPosts.data.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onClickTag={(target: any, tag: any) =>
                bookmarkSetState({ ...bookmarkState, showMenu: target, selectedTag: tag })
              }
              onClickMore={(target: any, post: any) =>
                postsSetState({ ...postsState, showMenu: target, selectedPost: post })
              }
            />
          ))}
        </>
      )}
      <Menu
        anchorEl={postsState.showMenu}
        keepMounted
        open={Boolean(postsState.showMenu)}
        onClose={() => postsSetState({ ...postsState, showMenu: null, selectedPost: null })}>
        <MenuItem onClick={() => postsSetState({ ...postsState, showEditModal: true })}>
          <ListItemIcon className="mr-n4">
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem
          onClick={async () => {
            await handleDeletePost();
            alert('Post deleted!');
          }}>
          <ListItemIcon className="mr-n4">
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
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
