import { useRouter } from 'next/router';
import { useState, ChangeEvent, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const routes = { feeds: '/feeds', myStory: '/my-story', fbSettings: '/fb-settings' };

export default function CenteredTabs() {
  const router = useRouter();
  const [value, setValue] = useState(routes.feeds);

  useEffect(() => {
    if (value !== router.pathname) {
      setValue(router.pathname);
    }
  }, []);

  const handleChange = (event: ChangeEvent<{}>, newValue: string) => {
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
        centered>
        <Tab label="Feeds" value={routes.feeds} />
        <Tab label="My Story" value={routes.myStory} />
        <Tab label="Settings" value={routes.fbSettings} />
      </Tabs>
    </Paper>
  );
}
