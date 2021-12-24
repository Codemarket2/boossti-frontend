import { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import GroupIcon from '@material-ui/icons/Group';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import { useRouter } from 'next/router';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Link from 'next/link';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import DarkModeToggle from '../common/DarkModeToggle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
    toolbar: theme.mixins.toolbar,
  }),
);

interface TProps {
  darkMode: boolean;
}

const StyledListItem = styled(ListItem)`
  padding-left: ${(props) => props.theme.spacing(4)}px;
`;

const checkActiveRoute = (activeRoute, linkPathname) => {
  return activeRoute.pathname === linkPathname;
};

const checkActiveListRoute = (activeRoute, _id) => {
  return activeRoute.pathname === '/admin/list/[_id]' && activeRoute._id === _id;
};

export default function AdminDrawer({ darkMode }: TProps) {
  const classes = useStyles();
  const [activeRoute, setActiveRoute] = useState({
    pathname: '/',
    _id: '',
    showList: true,
  });
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/admin/list/[_id]') {
      const _id = router.asPath.split('/admin/list/')[1];
      setActiveRoute({ ...activeRoute, pathname: router.pathname, showList: true, _id });
    } else {
      setActiveRoute({ ...activeRoute, pathname: router.pathname, _id: '' });
    }
  }, [router.asPath]);

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link href={`/admin`}>
          <ListItem button selected={checkActiveRoute(activeRoute, '/admin')}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </Link>
        <ListItem
          button
          onClick={() => setActiveRoute({ ...activeRoute, showList: !activeRoute.showList })}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="List Settings" />
          {activeRoute.showList ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={activeRoute.showList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Divider />
            <Link href={`/admin/list/types`}>
              <StyledListItem button selected={checkActiveRoute(activeRoute, '/admin/list/types')}>
                <ListItemText primary="List Types" />
              </StyledListItem>
            </Link>
            <Divider />
            <Link href={`/admin/list/items`}>
              <StyledListItem button selected={checkActiveRoute(activeRoute, '/admin/list/items')}>
                <ListItemText primary="List Items" />
              </StyledListItem>
            </Link>
            {/* {loading ? (
              <StyledListItem className="justify-content-center" button>
                <CircularProgress />
              </StyledListItem>
            ) : (
              <>
                <StyledListItem button onClick={() => handleShowForm()}>
                  <ListItemIcon className="mr-n4">
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add New" />
                </StyledListItem>
                {list.map((list) => (
                  <Link href={`/admin/list/${list._id}`}>
                    <StyledListItem
                      selected={checkActiveListRoute(activeRoute, list._id)}
                      key={list._id}
                      button>
                      <ListItemText primary={list.name} />
                    </StyledListItem>
                  </Link>
                ))}
              </>
            )} */}
          </List>
        </Collapse>
        <Divider />
        <DarkModeToggle />
        <Link href="/">
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Exit Admin" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      {/* <ListForm open={state.showForm} formik={formik} onClose={handleCloseForm} /> */}
    </div>
  );
}
