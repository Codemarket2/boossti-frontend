import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import UserLayout from '../components/common/UserLayout';
import PostForm from '../components/post/PostForm';

export default function Page() {
  const router = useRouter();
  return (
    <UserLayout authRequired>
      <Paper className="p-2" variant="outlined">
        <Typography variant="h4">Create Post</Typography>
        <PostForm onClose={() => router.push('/home')} />
      </Paper>
    </UserLayout>
  );
}
