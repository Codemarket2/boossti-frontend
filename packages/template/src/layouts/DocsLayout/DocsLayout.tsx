import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Topbar, Navbar } from './components';
import { ScrollTop } from '../../components/atoms';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
}));

interface Props {
  children: React.ReactNode;
  themeToggler: Function;
  themeMode: string;
}

const DocsLayout = ({ children, themeToggler, themeMode }: Props): JSX.Element => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Topbar
        themeMode={themeMode}
        themeToggler={themeToggler}
        onMobileNavOpen={() => setMobileNavOpen(true)}
      />
      <Navbar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
      <ScrollTop />
    </div>
  );
};

export default DocsLayout;
