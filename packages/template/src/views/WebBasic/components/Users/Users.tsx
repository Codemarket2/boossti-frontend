import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Avatar, Typography } from '@material-ui/core';
import { SectionHeader } from '../../../../components/molecules';
import { HeroSimpleBackground } from '../../../../components/organisms';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 60,
    height: 60,
    border: `${theme.spacing(1)}px solid ${theme.palette.background.paper}`,
    boxShadow: `0 2px 10px 0 ${theme.palette.cardShadow}`,
    marginTop: theme.spacing(1 / 2),
    [theme.breakpoints.up('sm')]: {
      width: 80,
      height: 80,
    },
  },
  grid: {
    maxWidth: 600,
    margin: '0 auto',
  },
}));

const Users = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title={
          <span>
            Join the biggest community of{' '}
            <Typography color="secondary" variant="inherit" component="span">
              users
            </Typography>
          </span>
        }
        subtitle="Build a beautiful, modern website with flexible, fully customizable, atomic Material UI components."
        ctaGroup={[
          <Button color="primary" variant="contained" size="large">
            Download now
          </Button>,
          <Button color="secondary" variant="outlined" size="large">
            See pricings
          </Button>,
        ]}
        label="build up a community"
        data-aos="fade-up"
      />
      <HeroSimpleBackground
        backgroundImage="https://assets.maccarianagency.com/the-front/illustrations/map.png"
        backgroundSize="contain">
        <Grid container spacing={0} className={classes.grid} data-aos="fade-up">
          {data.map((item: any, index: number) => (
            <Grid item container key={index} xs={4} direction={index < 3 ? 'row' : 'row-reverse'}>
              <Grid item xs={6}>
                <Avatar
                  src={item.logo}
                  className={classes.avatar}
                  data-aos="zoom-in"
                  data-aos-once="false"
                />
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          ))}
        </Grid>
      </HeroSimpleBackground>
    </div>
  );
};

export default Users;
