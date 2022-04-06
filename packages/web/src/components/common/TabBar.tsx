import { useRouter } from 'next/router';
import { useState, ChangeEvent, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const routes = {
  feeds: '/feeds',
  myStory: '/my-story',
  settings: '/settings',
  saved: '/saved',
};

export default function CenteredTabs() {
  const router = useRouter();
  const [value, setValue] = useState(routes.feeds);

  useEffect(() => {
    if (value !== router.pathname) {
      setValue(router.pathname);
    }
  }, []);

  const handleChange = (event: any, newValue: string) => {
    router.push(newValue);
  };

  return (
    <Paper>
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Feeds" value={routes.feeds} />
        <Tab label="My Story" value={routes.myStory} />
        <Tab label="Saved" value={routes.saved} />
        <Tab label="Settings" value={routes.settings} />
      </Tabs>
    </Paper>
  );
}
