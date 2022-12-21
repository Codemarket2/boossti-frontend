import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, colors } from '@material-ui/core';
import { CardBase } from '..';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    '&:hover': {
      borderRight: `${theme.spacing(1)}px solid ${colors.red[500]}`,
    },
  },
  dot: {
    display: 'inline-block',
    width: theme.spacing(1),
    height: theme.spacing(1),
    background: theme.palette.text.primary,
    borderRadius: '100%',
    marginRight: theme.spacing(1),
  },
  dotBig: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  dotSmall: {
    width: theme.spacing(1 / 2),
    height: theme.spacing(1 / 2),
  },
  jobTitle: {
    fontWeight: 700,
  },
  dotMargin: {
    margin: theme.spacing(0, 1),
  },
  tag: {
    display: 'inline-block',
    padding: theme.spacing(1 / 2),
    borderRadius: theme.spacing(1 / 2),
    border: '1px solid',
  },
  textWhite: {
    color: 'white',
  },
}));

/**
 * Component to display the job card
 *
 * @param {Object} props
 */
const CardJobTag = ({
  badgeColor,
  badgeTitle,
  jobTitle,
  jobLocation,
  jobType,
  className,
  ...rest
}: CardJobTagProps): JSX.Element => {
  const classes = useStyles();

  return (
    <CardBase className={clsx(classes.root, className)} align="left" {...rest}>
      <>
        <Grid container spacing={2}>
          <Grid item container alignItems="center" xs={12}>
            <span
              className={classes.tag}
              style={{
                background: badgeColor,
                borderColor: badgeColor,
              }}
            >
              <Typography component="span" variant="body2" className={classes.textWhite}>
                {badgeTitle}
              </Typography>
            </span>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.jobTitle}>
              {jobTitle}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item container alignItems="center" xs={12}>
            <Typography component="span" variant="subtitle1" color="textSecondary">
              {jobLocation}
            </Typography>
            <span className={clsx(classes.dot, classes.dotSmall, classes.dotMargin)} />
            <Typography component="span" variant="subtitle1" color="textSecondary">
              {jobType}
            </Typography>
          </Grid>
        </Grid>
      </>
    </CardBase>
  );
};

export default CardJobTag;
