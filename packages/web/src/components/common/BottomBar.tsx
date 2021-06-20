import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ChatBubble from '@material-ui/icons/ChatBubble';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Event from '@material-ui/icons/Event';
import Videocam from '@material-ui/icons/Videocam';
import Group from '@material-ui/icons/Group';

export default function SimpleBottomNavigation() {
  const router = useRouter();
  const [value, setValue] = React.useState('/');

  useEffect(() => {
    if (value !== router.pathname) {
      setValue(router.pathname);
    }
  }, []);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => router.push(newValue)}
      showLabels
      className="position-fixed"
      style={{ width: '100vw', bottom: 0 }}>
      <BottomNavigationAction value="/" label="Inbox" icon={<ChatBubble />} />
      <BottomNavigationAction value="/calendar" label="Calendar" icon={<CalendarToday />} />
      <BottomNavigationAction value="/offerings" label="Offerings" icon={<Event />} />
      <BottomNavigationAction value="/sessions" label="Sessions" icon={<Videocam />} />
      <BottomNavigationAction value="/clients" label="Clients" icon={<Group />} />
    </BottomNavigation>
  );
}
