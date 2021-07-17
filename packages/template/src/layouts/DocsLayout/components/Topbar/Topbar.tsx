import React from 'react';
import clsx from 'clsx';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  List,
  ListItem,
  Button,
  makeStyles,
} from '@material-ui/core';
import { Image, DarkModeToggler } from '../../../../components/atoms';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  logoContainer: {
    width: 100,
    height: 28,
    [theme.breakpoints.up('md')]: {
      width: 120,
      height: 32,
    },
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItem: {
    paddingRight: 0,
  },
  listItemText: {
    flex: '0 0 auto',
    whiteSpace: 'nowrap',
  },
  listItemButton: {
    whiteSpace: 'nowrap',
  },
  iconButton: {
    paddingRight: 0,
    '&:hover': {
      background: 'transparent',
    },
  },
}));

interface Props {
  className?: string;
  onMobileNavOpen: Function;
  themeToggler: Function;
  themeMode: string;
}

const TopBar = ({
  className,
  onMobileNavOpen,
  themeToggler,
  themeMode,
  ...rest
}: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} color="inherit" {...rest}>
      <Toolbar>
        <div className={classes.logoContainer}>
          <a href="/" title="thefront">
            <Image
              className={classes.logoImage}
              src={
                themeMode === 'light'
                  ? 'https://assets.maccarianagency.com/the-front/logos/logo.svg'
                  : 'https://assets.maccarianagency.com/the-front/logos/logo-negative.svg'
              }
              alt="thefront"
              lazy={false}
            />
          </a>
        </div>
        <Box flexGrow={1} />
        <DarkModeToggler themeMode={themeMode} onClick={() => themeToggler()} />
        <Hidden smDown>
          <List disablePadding className={classes.navigationContainer}>
            <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
              <Button className={classes.listItemText} component="a" href="/" variant="outlined">
                SEE ALL PAGES
              </Button>
            </ListItem>
            <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
              <Button
                variant="contained"
                color="primary"
                component="a"
                target="blank"
                href="https://material-ui.com/store/items/the-front-landing-page/"
                className={classes.listItemButton}>
                Sign In
              </Button>
            </ListItem>
          </List>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            onClick={() => onMobileNavOpen()}
            className={classes.iconButton}
            aria-label="Menu"
            disableRipple>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
