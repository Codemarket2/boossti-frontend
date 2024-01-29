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
import Thinking from '../../../pages/thinking/Thinking';

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
            <Link href="/thinking">
              <ListItem button selected={checkActiveRoute(activeRoute, '/thinking')}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="ThinkingInReact" />
              </ListItem>
            </Link>
            <Link href="/reactgriddemo">
              <ListItem button selected={checkActiveRoute(activeRoute, '/reactgriddemo')}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="ReactGridLayout" />
              </ListItem>
            </Link>
            <Link href="/ReactGridLayout">
              <ListItem button selected={checkActiveRoute(activeRoute, '/ReactGridLayout')}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="ReactGridLayout" />
              </ListItem>
            </Link>
            <Link href="/TicTacToe">
              <ListItem button selected={checkActiveRoute(activeRoute, '/TicTacToe')}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="TicTacToe" />
              </ListItem>
            </Link>
            <Link href="/WritingMarkupwithjsx">
              <ListItem button selected={checkActiveRoute(activeRoute, '/WritingMarkupwithjsx')}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="WritingMarkupwithjsx" />
              </ListItem>
            </Link>
            <Link href="/ImportExport">
              <ListItem button selected={checkActiveRoute(activeRoute, '/ImportExport')}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="ImportExport" />
              </ListItem>
            </Link>
            <Link href="/RenderingLists">
              <ListItem button selected={checkActiveRoute(activeRoute, '/RenderingLists')}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="RenderingLists" />
              </ListItem>
            </Link>
            <Link href="/Conditionalrendering">
              <ListItem button selected={checkActiveRoute(activeRoute, '/Conditionalrendering')}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="Conditionalrendering" />
              </ListItem>
            </Link>
            <Link href="/Componentspure">
              <ListItem button selected={checkActiveRoute(activeRoute, '/Componentspure')}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="Componentspure" />
              </ListItem>
            </Link>
            <Link href="/Jsxwithcurly">
              <ListItem button selected={checkActiveRoute(activeRoute, '/Jsxwithcurly')}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="Jsxwithcurly" />
              </ListItem>
            </Link>
            <Divider />
            <Link href="/Respondingtoevents">
              <ListItem button selected={checkActiveRoute(activeRoute, '/Respondingtoevents')}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="Respondingtoevents" />
              </ListItem>
            </Link>
            <Link href="/StateExercise">
              <ListItem button selected={checkActiveRoute(activeRoute, '/StateExercise')}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="StateExercise" />
              </ListItem>
            </Link>
            <Link href="/Stateassnapshot">
              <ListItem button selected={checkActiveRoute(activeRoute, '/Stateassnapshot')}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="Stateassnapshot" />
              </ListItem>
            </Link>
            <Link href="/Updatingstateobjects">
              <ListItem button selected={checkActiveRoute(activeRoute, '/Updatingstateobjects')}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="Updatingstateobjects" />
              </ListItem>
            </Link>
            <Link href="/Updatingarraysinstate">
              <ListItem button selected={checkActiveRoute(activeRoute, '/Updatingarraysinstate')}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="Updatingarraysinstate" />
              </ListItem>
            </Link>
            <Divider />
          </>
        )}
      </List>
    </Drawer>
  );
}
