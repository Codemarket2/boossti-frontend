import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Image } from '../../../../components/atoms';

const useStyles = makeStyles((theme) => ({
  promoLogo: {
    maxWidth: 120,
  },
}));

const Partners = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={className} {...rest}>
      <Grid container justify="space-between">
        {data.map((partner: any, index: number) => (
          <Grid item container justify="center" xs={6} sm={2} key={index} data-aos="fade-up">
            <Image
              src={partner.logo}
              alt={partner.name}
              className={classes.promoLogo}
              lazy={false}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Partners;
