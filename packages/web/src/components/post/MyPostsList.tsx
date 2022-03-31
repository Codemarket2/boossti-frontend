import { useGetMyPosts } from '@frontend/shared/hooks/post';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';
import PostCard from './PostCard';
import PostEditForm from './PostEditForm';
import PostCardSkeleton from './PostCardSkeleton';
import ListHeader from '../common/ListHeader';

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
      <ListHeader
        search={postsState.search}
        showSearch={postsState.showSearch}
        onHide={() => postsSetState({ ...postsState, search: '', showSearch: false })}
        onShow={() => postsSetState({ ...postsState, search: '', showSearch: true })}
        onChange={(value) => postsSetState({ ...postsState, search: value })}
      >
        <Link href="/create-post">
          <Button
            className="inline-block"
            size="small"
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
          >
            CreatePost
          </Button>
        </Link>
      </ListHeader>
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
        onClose={() => postsSetState({ ...postsState, showMenu: null, selectedPost: null })}
      >
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
          }}
        >
          <ListItemIcon className="mr-n4">
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </div>
  );
}
