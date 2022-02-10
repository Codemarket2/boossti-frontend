import { useState, ReactNode } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import projectConfig from '@frontend/shared';
import AuthRequired from '../common/AuthRequired';
import AdminDrawer from './AdminDrawer';
import Head from 'next/head';

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
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      // backgroundColor:
      //   theme['type'] === 'dark'
      //     ? theme.palette.background.level1
      //     : theme.palette.background.level2,
      // backgroundColor: theme.palette.background.level2,
      // color: theme.palette.primary.dark,
    },
    toolbar: theme.mixins.toolbar,
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
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AuthRequired mustAdmin>
      <Head>
        <title>{projectConfig.title} Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.root}>
        <AppBar
          elevation={1}
          position="fixed"
          className={classes.appBar}
          color="inherit"
          // color={darkMode ? 'default' : 'primary'}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography className="font-weight-bold" color="textPrimary" variant="h5" noWrap>
              {projectConfig.title} Admin
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
            }}
          >
            <AdminDrawer darkMode={darkMode} />
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
