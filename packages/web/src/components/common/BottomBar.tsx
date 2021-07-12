import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ChatBubble from '@material-ui/icons/ChatBubble';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Event from '@material-ui/icons/Event';
import Videocam from '@material-ui/icons/Videocam';
import HomeIcon from '@material-ui/icons/Home';
import Group from '@material-ui/icons/Group';
import styled from 'styled-components';
import { routes } from '../../utils/routes';

const setActiveRouteColor = (activeRoute, linkRoute) => {
  return { color: activeRoute === linkRoute ? '#fff' : 'rgba(255, 255, 255, 0.5)' };
};

const StyledBottomNavigation = styled(BottomNavigation)`
  background-color: ${(props) =>
    props.theme.palette.type === 'dark'
      ? props.theme.palette.grey[900]
      : props.theme.palette.primary.main} !important;
  position: fixed;
  width: 100%;
  bottom: 0px;
  display: none !important;
  ${(props) => props.theme.breakpoints.down('xs')} {
    display: flex !important;
  }
`;

export default function SimpleBottomNavigation() {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState('/');

  useEffect(() => {
    if (activeRoute !== router.pathname) {
      setActiveRoute(router.pathname);
    }
  }, []);

  return (
    <StyledBottomNavigation
      value={activeRoute}
      onChange={(event, newValue) => router.push(newValue)}
      showLabels>
      <BottomNavigationAction
        style={setActiveRouteColor(activeRoute, routes.home)}
        value={routes.home}
        label="Home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        value={routes.inbox}
        style={setActiveRouteColor(activeRoute, routes.inbox)}
        label="Inbox"
        icon={<ChatBubble />}
      />
      <BottomNavigationAction
        style={setActiveRouteColor(activeRoute, routes.offerings)}
        value={routes.offerings}
        label="Offerings"
        icon={<Event />}
      />
      <BottomNavigationAction
        style={setActiveRouteColor(activeRoute, routes.sessions)}
        value={routes.sessions}
        label="Sessions"
        icon={<Videocam />}
      />
      {/* <BottomNavigationAction
        style={setActiveRouteColor(activeRoute, routes.clients)}
        value={routes.clients}
        label="Clients"
        icon={<Group />}
      /> */}
    </StyledBottomNavigation>
  );
}
