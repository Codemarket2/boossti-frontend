import React, { useState, ReactNode } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import GroupIcon from '@material-ui/icons/Group';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
import AuthRequired from './AuthRequired';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      // [theme.breakpoints.up('sm')]: {
      //   width: `calc(100% - ${drawerWidth}px)`,
      //   marginLeft: drawerWidth,
      // },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: ReactNode;
}

export default function ResponsiveDrawer({ window, children }: Props) {
  const darkMode = useSelector(({ auth }: any) => auth.darkMode);
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem selected button>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <DarkModeToggle darkMode={darkMode} />
        <Link href="/inbox">
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Exit Admin" />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </div>
  );

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <AuthRequired mustAdmin>
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classes.appBar}
          color={darkMode ? 'default' : 'primary'}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Drreamz Admin
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="admin folders">
          <Drawer
            // container={container}
            variant={matches ? 'temporary' : 'permanent'}
            open={matches ? mobileOpen : true}
            anchor="left"
            // open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}>
            {drawer}
          </Drawer>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </AuthRequired>
  );
}
