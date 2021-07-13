import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    display: 'block',
  },
}));

interface Props {
  /**
   * External classes
   */
  className?: string;
  /**
   * The content
   */
  children: JSX.Element;
  /**
   * Show bottom margin
   */
  gutterBottom: boolean;
  /**
   * All other props
   */
  [x:string]: any;
};

const SectionBox = ({ title, children, gutterBottom, className, ...rest }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box marginBottom={gutterBottom ? 4 : 0} className={className} {...rest}>
      <Typography variant="button" color="textSecondary" className={classes.title}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default SectionBox;
