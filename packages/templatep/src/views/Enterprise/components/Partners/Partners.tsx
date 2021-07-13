import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import { Image } from '../../../../components/atoms';

const useStyles = makeStyles(() => ({
  fontWeight700: {
    fontWeight: 700,
  },
  image: {
    maxWidth: 100,
  },
}));

const Partners = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={className} {...rest}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            color="textSecondary"
            align="center"
            className={classes.fontWeight700}>
            Our work has been featured in:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="space-between">
            {data.map((partner: any, index: number) => (
              <Grid item container justify="center" xs={6} sm={2} key={index}>
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  className={classes.image}
                  lazy={false}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Partners;
