import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useMediaQuery, Grid, Button, Avatar } from '@material-ui/core';
import { SectionHeader } from '../../../../components/molecules';

const useStyles = makeStyles((theme) => ({
  galleryMedia: {
    width: 60,
    height: 60,
    marginLeft: theme.spacing(-2),
    border: `3px solid ${theme.palette.background.paper}`,
    '&:first-child': {
      marginLeft: 0,
    },
    [theme.breakpoints.up('sm')]: {
      width: 100,
      height: 100,
    },
    [theme.breakpoints.up('md')]: {
      width: 140,
      height: 140,
    },
  },
}));

const Community = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title="Join our community"
        subtitle="Over +8000 members."
        ctaGroup={[
          <Button variant="contained" size={isMd ? 'large' : 'medium'} color="primary">
            Join
          </Button>,
        ]}
      />
      <Grid container justify="center" data-aos="fade-up">
        {data.map((item: any, index: number) => (
          <Avatar key={index} className={classes.galleryMedia} alt={item.title} {...item.image} />
        ))}
      </Grid>
    </div>
  );
};

export default Community;
