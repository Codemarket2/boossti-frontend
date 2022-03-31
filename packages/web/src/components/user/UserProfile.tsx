import { useState } from 'react';
import { useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ProfileCard from './ProfileCard';
import MyPostsList from '../post/MyPostsList';
import BookmarkList from '../bookmark/BookmarkList';
import FBSettings from '../facebook/FBSettings';
import About from './About';

export default function ProfileScreen() {
  const [value, setValue] = useState('posts');
  const attributes = useSelector(({ auth }: any) => auth.attributes);
  return (
    <div>
      <Paper variant="outlined">
        <ProfileCard user={attributes} />
        <Divider />
        <Tabs
          value={value}
          onChange={(event: React.ChangeEvent<{}>, newValue: string) => setValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
          centered
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="Posts" value="posts" />
          <Tab label="My Story" value="about" />
          <Tab label="Saved Tags" value="bookmarks" />
          <Tab label="Facebook Setting" value="facebookPostSetting" />
        </Tabs>
      </Paper>
      {value === 'posts' && <MyPostsList />}
      {value === 'about' && <About userId={attributes['custom:_id']} />}
      {value === 'bookmarks' && <BookmarkList />}
      {value === 'facebookPostSetting' && <FBSettings showUser={true} />}
    </div>
  );
}
