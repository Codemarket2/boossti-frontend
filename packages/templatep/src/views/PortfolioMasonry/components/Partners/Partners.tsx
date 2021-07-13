import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  noBg: {
    background: 'transparent',
  },
  copy: {
    textAlign: 'center',
    maxWidth: 700,
    margin: '0 auto',
    padding: theme.spacing(2, 2, 0, 2),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 2, 0, 2),
    },
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  logoImg: {
    maxWidth: 100,
  },
  fontWeight700: {
    fontWeight: 700,
  },
}));

const Partners = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} data-aos="fade-up" {...rest}>
      <div className={classes.copy}>
        <SectionHeader
          title="Our work has been featured"
          subtitle="We design & build products, tools, apps, and sites for companies trying to do great things for our planet."
          data-aos="fade-up"
          align="center"
        />
        <Grid container justify="space-between">
          {data.map((partner: any, index: number) => (
            <Grid item xs={6} sm={2} key={index}>
              <Image
                src={partner.logo}
                alt={partner.name}
                className={classes.logoImg}
                lazy={false}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Partners;
