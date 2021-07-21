import { useState } from 'react';
import { useSelector } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import ProfileCard from './ProfileCard';
import MyPostsList from '../post/MyPostsList';
import BookmarkList from '../bookmark/BookmarkList';
import FBSettings from '../facebook/FBSettings';

export default function ProfileScreen() {
  const [value, setValue] = useState('posts');
  const attributes = useSelector(({ auth }: any) => auth.attributes);
  return (
    <div>
      <ProfileCard attributes={attributes} />
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
      {value === 'facebookPostSetting' && <FBSettings showUser={true} />}
    </div>
  );
}
