import { useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';

export default function ProfileCard() {
  const attributes = useSelector(({ auth }: any) => auth.attributes);
  const [value, setValue] = useState('posts');
  return (
    <>
      <div className="text-center mb-2">
        <Typography variant="h3">Profile</Typography>
        <Avatar
          style={{ minWidth: 250, minHeight: 250, margin: '0 auto' }}
          alt="Remy Sharp"
          src={attributes.picture}
        />
        <Typography>{attributes.name}</Typography>
        <Typography>{attributes.email}</Typography>
      </div>
      <Divider />
      <Tabs
        value={value}
        onChange={(event: React.ChangeEvent<{}>, newValue: string) => setValue(newValue)}
        indicatorColor="primary"
        textColor="primary"
        centered>
        <Tab label="Posts" value="posts" />
        <Tab label="Bookmarks" value="bookmarks" />
      </Tabs>
    </>
  );
}
