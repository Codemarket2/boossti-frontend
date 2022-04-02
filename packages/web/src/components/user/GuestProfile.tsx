import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { useGetOneUser } from '@frontend/shared/hooks/user';
import ProfileCard from './ProfileCard';
import UserPostList from '../post/UserPostList';
import UserProfileCardSkeleton from './UserProfileCardSkeleton';
import About from './About';

export default function ProfileScreen({ _id }: any) {
  const [value, setValue] = useState('posts');
  const { data, error } = useGetOneUser({ _id });
  return (
    <div>
      <Paper variant="outlined">
        {data && data.getUser ? <ProfileCard user={data.getUser} /> : <UserProfileCardSkeleton />}
        <Divider />
        <Tabs
          value={value}
          onChange={(event: any, newValue: string) => setValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
          centered
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="Posts" value="posts" />
          <Tab label="About" value="about" />
        </Tabs>
      </Paper>
      {value === 'posts' && <UserPostList userId={_id} />}
      {value === 'about' && <About userId={_id} authorized={false} />}
    </div>
  );
}
