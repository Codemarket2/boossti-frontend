import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Image } from '../../components2/atoms';
import { SectionHeader } from '../../components2/molecules';
import { Section } from '../../components2/organisms';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.dark,
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
    },
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: 470,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  section: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  sectionHeader: {
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('md')]: {
      maxWidth: '50%',
      width: 'calc(100vw - 625px)',
    },
  },
  textWhite: {
    color: 'white',
  },
  image: {
    alignSelf: 'flex-end',
    maxWidth: 625,
    height: 'auto',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: '50%',
      right: 0,
      width: 'auto',
      transform: 'translateY(-50%) !important',
    },
  },
}));

const Hero = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div className={classes.hero}>
        <Section className={classes.section}>
          <div className={classes.sectionHeader}>
            <Typography variant="h6" gutterBottom className={classes.textWhite}>
              Download Free for Mac, Windows and Linux OS
            </Typography>
            <SectionHeader
              titleVariant="h3"
              title={
                <span className={classes.textWhite}>
                  Build Applications faster than ever !
                  <br />
                  Get Started Now,
                </span>
              }
              subtitle={
                <span className={classes.textWhite}>
                  Grab the online customers to increase your revenue…. Sell online and offline
                </span>
              }
              ctaGroup={[
                <Button variant="contained" size="large">
                  Explore
                </Button>,
              ]}
              align="left"
              data-aos="fade-up"
            />
          </div>
        </Section>
        <Image
          src="https://assets.maccarianagency.com/the-front/illustrations/macbook-dashboard.png"
          className={classes.image}
          data-aos="fade-up"
          lazy={false}
        />
      </div>
    </div>
  );
};

export default Hero;
