import Typography from '@material-ui/core/Typography';
import UserLayout from '../components/common/UserLayout';
import PostForm from '../components/post/PostForm';

export default function Page() {
  return (
    <UserLayout authRequired>
      <Typography variant="h4">Create Post</Typography>
      <PostForm />
    </UserLayout>
  );
}
