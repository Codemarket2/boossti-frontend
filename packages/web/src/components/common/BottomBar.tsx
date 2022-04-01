import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { updateSettingAction } from '@frontend/shared/redux/actions/setting';
import { routes } from '../../utils/routes';

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  position: 'fixed',
  width: '100%',
  bottom: 0,
  display: 'none !important',
  [theme.breakpoints.down('sm')]: {
    display: 'flex !important',
  },
}));

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
