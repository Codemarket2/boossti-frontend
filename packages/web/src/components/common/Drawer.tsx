import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useMenuTemplates } from '@frontend/shared/hooks/template';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import GroupIcon from '@mui/icons-material/Group';
import ListIcon from '@mui/icons-material/List';
import TuneIcon from '@mui/icons-material/Tune';
import EmailIcon from '@mui/icons-material/Email';
import Contacts from '@mui/icons-material/Contacts';
import { useRouter } from 'next/router';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import AnalyticsIcon from '@mui/icons-material/Announcement';
import BuildIcon from '@mui/icons-material/Build';
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
        <IconButton onClick={() => toggleDrawer(false)} size="large">
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <List style={{ minWidth: 300 }}>
        <DarkModeToggle />
        <Divider />
        <Link href="/feed">
          <ListItem button selected={checkActiveRoute(activeRoute, '/feeds')}>
            <ListItemIcon>
              <TuneIcon />
            </ListItemIcon>
            <ListItemText primary="Feed" />
          </ListItem>
        </Link>
        <Link href="/form/apps">
          <ListItem button selected={checkActiveRoute(activeRoute, '/templates')}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Apps" />
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
        <Link href="/customizeUI">
          <ListItem button selected={checkActiveRoute(activeRoute, '/customizeUI')}>
            <ListItemIcon>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="Customize UI" />
          </ListItem>
        </Link>
        {data?.getMenuListTypes?.map((t) => (
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
