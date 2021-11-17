import { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import GroupIcon from '@material-ui/icons/Group';
import ListIcon from '@material-ui/icons/List';
import TuneIcon from '@material-ui/icons/Tune';
import { useRouter } from 'next/router';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';

const checkActiveRoute = (activeRoute, linkPathname) => {
  return activeRoute.pathname === linkPathname;
};

export default function AdminDrawerList() {
  const [activeRoute, setActiveRoute] = useState({
    pathname: '/',
    showList: true,
  });
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== activeRoute.pathname) {
      setActiveRoute({ ...activeRoute, pathname: router.pathname });
    }
  }, [router.asPath]);

  return (
    <>
      <ListSubheader>Admin</ListSubheader>
      <Link href="/admin/users">
        <ListItem button selected={checkActiveRoute(activeRoute, '/admin/users')}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </Link>
      {/* <Divider /> */}
      <Link href="/types">
        <ListItem button selected={checkActiveRoute(activeRoute, '/types')}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Types" />
        </ListItem>
      </Link>
      <Link href="/forms">
        <ListItem button selected={checkActiveRoute(activeRoute, '/forms')}>
          <ListItemIcon>
            <TuneIcon />
          </ListItemIcon>
          <ListItemText primary="Forms" />
        </ListItem>
      </Link>
      <Divider />
    </>
  );
}
