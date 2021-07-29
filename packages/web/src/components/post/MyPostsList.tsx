import { useGetMyPosts } from '@frontend/shared/hooks/post';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';
import PostCard from './PostCard';
import PostEditForm from './PostEditForm';
import PostCardSkeleton from './PostCardSkeleton';

export default function MyPostsList() {
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
      <Backdrop open={deletePostLoading} />
      <Paper
        variant="outlined"
        className="my-2 pr-1 d-flex justify-content-between align-items-center"
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
        data.getMyPosts.data.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onClickMore={(target: any, post: any) =>
              postsSetState({ ...postsState, showMenu: target, selectedPost: post })
            }
          />
        ))
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
    </div>
  );
}
