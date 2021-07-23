import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ChatBubble from '@material-ui/icons/ChatBubble';
import Event from '@material-ui/icons/Event';
import Videocam from '@material-ui/icons/Videocam';
import HomeIcon from '@material-ui/icons/Home';
import styled from 'styled-components';
import { routes } from '../../utils/routes';

const StyledBottomNavigation = styled(BottomNavigation)`
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
      <BottomNavigationAction value={routes.home} label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction value={routes.inbox} label="Inbox" icon={<ChatBubble />} />
      <BottomNavigationAction value={routes.offerings} label="Offerings" icon={<Event />} />
      <BottomNavigationAction value={routes.sessions} label="Sessions" icon={<Videocam />} />
    </StyledBottomNavigation>
  );
}
