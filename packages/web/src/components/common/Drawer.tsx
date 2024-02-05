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
import PropTypes from 'prop-types';
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
        <Link href="/thinking">
          <ListItem button selected={checkActiveRoute(activeRoute, '/thinking')}>
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Thinking in React" />
          </ListItem>
        </Link>
        <Link href="/gridExercise">
          <ListItem button selected={checkActiveRoute(activeRoute, '/gridExercise')}>
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Grid Exercise" />
          </ListItem>
        </Link>
        <Link href="/formExercise">
          <ListItem button selected={checkActiveRoute(activeRoute, '/fromExercise')}>
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Forms Exercise" />
          </ListItem>
        </Link>
        {/* </List> */}
        {/* </List> */}
        <Link href="/formExercise2">
          <ListItem button selected={checkActiveRoute(activeRoute, '/fromExercise2')}>
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Forms Exercise 2" />
          </ListItem>
        </Link>
        {/* </List> */}
      </List>
      <Link href="/tic-tac-toe">
        <ListItem button selected={checkActiveRoute(activeRoute, '/tic-tac-toe')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Tic-Tac-Toe" />
        </ListItem>
      </Link>
      {/* </List> */}
      {/* </List> */}
      <Link href="/profile">
        <ListItem button selected={checkActiveRoute(activeRoute, '/profile')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </Link>
      <Link href="/importExport">
        <ListItem button selected={checkActiveRoute(activeRoute, '/importExport')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Import and Export" />
        </ListItem>
      </Link>
      <Link href="/convert">
        <ListItem button selected={checkActiveRoute(activeRoute, '/convert')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Convert to JSX" />
        </ListItem>
      </Link>
      <Link href="/inJSX">
        <ListItem button selected={checkActiveRoute(activeRoute, '/inJSX')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="JavaScript in JSX" />
        </ListItem>
      </Link>
      <Link href="/passingProps">
        <ListItem button selected={checkActiveRoute(activeRoute, '/passingProps')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Passing props in React" />
        </ListItem>
      </Link>
      <Link href="/conditionalRendering">
        <ListItem button selected={checkActiveRoute(activeRoute, '/conditionalRendering')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Conditional Rendering" />
        </ListItem>
      </Link>
      <Link href="/respondingToEvents">
        <ListItem button selected={checkActiveRoute(activeRoute, '/respondingToEvents')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Responding To Events" />
        </ListItem>
      </Link>
      <Link href="/state">
        <ListItem button selected={checkActiveRoute(activeRoute, '/state')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="State : A components memory" />
        </ListItem>
      </Link>
      <Link href="/renderAndCommit">
        <ListItem button selected={checkActiveRoute(activeRoute, '/renderAndCommit')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Render And Commit" />
        </ListItem>
      </Link>
      <Link href="/stateAsASnapshot">
        <ListItem button selected={checkActiveRoute(activeRoute, '/stateAsASnapshot')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="State As A Snapshot" />
        </ListItem>
      </Link>
      <Link href="/stateUpdates">
        <ListItem button selected={checkActiveRoute(activeRoute, '/stateUpdates')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Queueing a Series of State Update" />
        </ListItem>
      </Link>
      <Link href="/updatingObject">
        <ListItem button selected={checkActiveRoute(activeRoute, '/updatingObject')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Updating objects in a state" />
        </ListItem>
      </Link>
      <Link href="/updatingArrayInState">
        <ListItem button selected={checkActiveRoute(activeRoute, '/updatingArrayInState')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Updating Array In State" />
        </ListItem>
      </Link>
      <Link href="/managingState">
        <ListItem button selected={checkActiveRoute(activeRoute, '/managingState')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Managing the state" />
        </ListItem>
      </Link>
      <Link href="/stateStructure">
        <ListItem button selected={checkActiveRoute(activeRoute, '/stateStructure')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Choosing the state structure" />
        </ListItem>
      </Link>
      <Link href="/sharingState">
        <ListItem button selected={checkActiveRoute(activeRoute, '/sharingState')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Sharing State between components" />
        </ListItem>
      </Link>
      <Link href="/preservingResetting">
        <ListItem button selected={checkActiveRoute(activeRoute, '/preservingResetting')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Preserving and Resetting state" />
        </ListItem>
      </Link>
      <Link href="/extractingState">
        <ListItem button selected={checkActiveRoute(activeRoute, '/extractingState')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Extracting State logic to a reducer" />
        </ListItem>
      </Link>
      <Link href="/scalingUp">
        <ListItem button selected={checkActiveRoute(activeRoute, '/scalingUp')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Scaling up with reducer and context" />
        </ListItem>
      </Link>
      <Link href="/passingDataDeeply">
        <ListItem button selected={checkActiveRoute(activeRoute, '/passingDataDeeply')}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Passing data deeply with context" />
        </ListItem>
      </Link>
    </Drawer>
  );
}
