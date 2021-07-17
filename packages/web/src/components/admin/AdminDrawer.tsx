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
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/link';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import DarkModeToggle from '../common/DarkModeToggle';
import { useGetLists } from '@frontend/shared/hooks/list';
import ListForm from '../list/ListForm';

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
  const { formik, state, loading, handleShowForm, handleCloseForm } = useGetLists();
  const list = useSelector(({ list }: any) => list);
  const [activeRoute, setActiveRoute] = useState({
    pathname: '/',
    _id: '',
    showList: false,
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
          onClick={() => setActiveRoute({ ...activeRoute, showList: !activeRoute.showList })}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="List Settings" />
          {activeRoute.showList ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={activeRoute.showList} timeout="auto" unmountOnExit>
          <List dense component="div" disablePadding>
            {loading ? (
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
            )}
          </List>
        </Collapse>
        <Divider />
        <DarkModeToggle darkMode={darkMode} />
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
      <ListForm open={state.showForm} formik={formik} onClose={handleCloseForm} />
    </div>
  );
}
