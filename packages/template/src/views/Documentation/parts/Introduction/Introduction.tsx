import React from 'react';
import { makeStyles, Divider } from '@material-ui/core';

import {
  Features,
  FolderStructure,
  Headline,
  Technologies,
} from './components';

const useStyles = makeStyles(theme => ({
  divider: {
    margin: theme.spacing(3, 0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(5, 0),
    },
  },
  list: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
}));

const Introduction = ({ className, ...rest }: any): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={className} {...rest}>
      <Headline />
      <Divider className={classes.divider} />
      <Features className={classes.list} />
      <Technologies className={classes.list} />
      <FolderStructure className={classes.list} />
    </div>
  );
};

export default Introduction;
