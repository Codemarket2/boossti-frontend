import { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import ProfileCard from '../components/user/ProfileCard';
import MyPostsList from '../components/post/MyPostsList';
import BookmarkList from '../components/bookmark/BookmarkList';
import FBSettings from '../components/facebook/FBSettings';

export default function ProfileScreen() {
  const [value, setValue] = useState('facebookPostSetting');
  return (
    <div>
      <ProfileCard />
      <Divider />
      <Tabs
        value={value}
        onChange={(event: React.ChangeEvent<{}>, newValue: string) => setValue(newValue)}
        indicatorColor="primary"
        textColor="primary"
        centered>
        <Tab label="Posts" value="posts" />
        <Tab label="Saved Tags" value="bookmarks" />
        <Tab label="Facebook Post Setting" value="facebookPostSetting" />
      </Tabs>
      {value === 'posts' && <MyPostsList />}
      {value === 'bookmarks' && <BookmarkList />}
      {value === 'facebookPostSetting' && <FBSettings />}
    </div>
  );
}
