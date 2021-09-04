import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';

import { SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: '100%',
    maxWidth: 325,
  },
  root: {
    height: '100%',
    padding: theme.spacing(1),
  },
  nav: {
    marginBottom: theme.spacing(1),
  },
}));

interface Props {
  className?: string;
  onClose: Function;
  open: boolean;
  variant: 'permanent' | 'persistent' | 'temporary' | undefined;
  pages: PagesProps;
};

const Sidebar = ({ pages, open, variant, onClose, className, ...rest }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={() => onClose()}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <SidebarNav className={classes.nav} pages={pages} onClose={onClose} />
      </div>
    </Drawer>
  );
};

export default Sidebar;
