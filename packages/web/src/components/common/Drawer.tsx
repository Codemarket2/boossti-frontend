import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { useMenuTemplates } from '@frontend/shared/hooks/template';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import GroupIcon from '@material-ui/icons/Group';
import ListIcon from '@material-ui/icons/List';
import TuneIcon from '@material-ui/icons/Tune';
import EmailIcon from '@material-ui/icons/Email';
import Contacts from '@material-ui/icons/Contacts';
import { useRouter } from 'next/router';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';
import AnalyticsIcon from '@material-ui/icons/Announcement';
import DarkModeToggle from './DarkModeToggle';

interface IProps {
  showDrawer: boolean;
  toggleDrawer: (arg: boolean) => void;
  admin: boolean;
}

const checkActiveRoute = (activeRoute, linkPathname) => {
  return activeRoute.pathname === linkPathname;
};

export default function DrawerContent({ showDrawer, toggleDrawer, admin }: IProps): any {
  const { setting } = useSelector((state: any) => state);
  const [activeRoute, setActiveRoute] = useState({
    pathname: '/',
    showList: true,
  });
  const router = useRouter();
  const { data } = useMenuTemplates();

  useEffect(() => {
    if (router.pathname !== activeRoute.pathname) {
      setActiveRoute({ ...activeRoute, pathname: router.pathname });
    }
  }, [router.asPath]);

  return (
    <Drawer anchor="left" open={showDrawer} onClose={() => toggleDrawer(false)}>
      <div
        style={{ maxWidth: '300px' }}
        className="d-flex justify-content-between  align-items-center align-content-center"
      >
        <div className="w-100 text-center">
          <img
            style={{ maxHeight: 60 }}
            src={setting?.metaTags?.image}
            alt={setting?.metaTags?.title}
          />
        </div>
        <IconButton onClick={() => toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <List style={{ minWidth: 300 }}>
        <DarkModeToggle />
        <Divider />
        <Link href="/types">
          <ListItem button selected={checkActiveRoute(activeRoute, '/templates')}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Templates" />
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
        <Link href="/emails">
          <ListItem button selected={checkActiveRoute(activeRoute, '/emails')}>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Emails" />
          </ListItem>
        </Link>
        <Link href="/contact">
          <ListItem button selected={checkActiveRoute(activeRoute, '/contact')}>
            <ListItemIcon>
              <Contacts />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
        </Link>
        <Link href="/log">
          <ListItem button selected={checkActiveRoute(activeRoute, '/log')}>
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Activity Log" />
          </ListItem>
        </Link>
        {data?.getMenuTemplates?.map((t) => (
          <Link href={`/${t.slug}`} key={t._id}>
            <ListItem button selected={checkActiveRoute(activeRoute, '/log')}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={t.title} />
            </ListItem>
          </Link>
        ))}
        <Divider />
        {admin && (
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
            <Divider />
          </>
        )}
      </List>
    </Drawer>
  );
}
