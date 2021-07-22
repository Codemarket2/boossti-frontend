import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import UserLayout from '../components/common/UserLayout';
import PostForm from '../components/post/PostForm';

export default function Page() {
  const router = useRouter();
  return (
    <UserLayout authRequired>
      <Typography variant="h4">Create Post</Typography>
      <PostForm onClose={() => router.push('/home')} />
    </UserLayout>
  );
}
