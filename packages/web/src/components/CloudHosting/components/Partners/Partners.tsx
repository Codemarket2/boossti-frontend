import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Image } from '../../components2/atoms';

const useStyles = makeStyles((theme) => ({
  logoImg: {
    maxWidth: 120,
  },
}));

const Partners = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={className} {...rest}>
      <Grid container justify="space-between" alignItems="center" data-aos="fade-up">
        {data.map((partner: any, index: number) => (
          <Grid item container justify="center" alignItems="center" xs={6} sm={2} key={index}>
            <Image src={partner.logo} alt={partner.name} className={classes.logoImg} lazy={false} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Partners;
