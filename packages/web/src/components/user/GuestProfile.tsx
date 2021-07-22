import { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import ProfileCard from './ProfileCard';
import UserPostList from '../post/UserPostList';
import { useGetOneUser } from '@frontend/shared/hooks/user';
import UserProfileCardSkeleton from './UserProfileCardSkeleton';

export default function ProfileScreen({ _id }: any) {
  const [value, setValue] = useState('posts');
  const { data, error } = useGetOneUser({ _id });
  return (
    <div>
      {data && data.getUser ? <ProfileCard user={data.getUser} /> : <UserProfileCardSkeleton />}
      <Divider />
      <Tabs
        value={value}
        onChange={(event: React.ChangeEvent<{}>, newValue: string) => setValue(newValue)}
        indicatorColor="primary"
        textColor="primary"
        centered>
        <Tab label="Posts" value="posts" />
        <Tab label="About" value="about" />
      </Tabs>
      {_id && <UserPostList userId={_id} />}
    </div>
  );
}
