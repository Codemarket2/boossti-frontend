import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home';
import styled from 'styled-components';
import { routes } from '../../utils/routes';
import { useSelector, useDispatch } from 'react-redux';
import { updateSettingAction } from '@frontend/shared/redux/actions/setting';

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
  const dispatch = useDispatch();
  const [activeRoute, setActiveRoute] = useState('/');
  const { attributes, setting } = useSelector(({ auth, setting }: any) => ({
    attributes: auth.attributes,
    setting,
  }));

  useEffect(() => {
    if (activeRoute !== router.pathname) {
      setActiveRoute(router.pathname);
    }
  }, []);

  const onClick = (event, newValue) => {
    if (newValue === 'more') {
      dispatch(updateSettingAction({ bottomDrawer: !setting.bottomDrawer }));
    } else {
      router.push(newValue);
    }
  };

  return (
    <StyledBottomNavigation value={activeRoute} onChange={onClick} showLabels>
      <BottomNavigationAction value={routes.feeds} label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction
        value={`/user/${attributes['custom:_id']}`}
        label="Profile"
        icon={<AccountCircleIcon />}
      />
      <BottomNavigationAction value="more" label="More" icon={<MoreVertIcon />} />
    </StyledBottomNavigation>
  );
}
