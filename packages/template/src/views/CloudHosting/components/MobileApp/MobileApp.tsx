import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  ListItem,
  ListItemAvatar,
  Typography,
  Avatar,
} from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';

const useStyles = makeStyles(() => ({
  checkBox: {
    background: 'transparent',
    borderRadius: 0,
  },
  listItemAvatar: {
    alignSelf: 'flex-start',
  },
}));

const MobileApp = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item container justify="center" xs={12} md={6} data-aos="fade-up">
          <Image src="https://assets.maccarianagency.com/the-front/illustrations/dashboard-extended.svg" />
        </Grid>
        <Grid item xs={12} md={6} data-aos="fade-up">
          <Grid container alignItems="flex-start" justify="center" direction="column">
            <SectionHeader
              label="COMPLETE CONTROL"
              title="Monitor and analyze usage patterns."
              subtitle="Keep track of what's happening with your data, change permissions, and run reports against your data anywhere in the world."
              align="left"
              disableGutter
            />
            <Grid container spacing={2}>
              {data.map((item: any, index: number) => (
                <Grid item xs={12} sm={6} key={index} data-aos="fade-up">
                  <ListItem disableGutters>
                    <ListItemAvatar className={classes.listItemAvatar}>
                      <Avatar
                        src="https://assets.maccarianagency.com/the-front/illustrations/check-icon-yellow.svg"
                        className={classes.checkBox}
                      />
                    </ListItemAvatar>
                    <Typography variant="subtitle1" color="textPrimary">
                      {item}
                    </Typography>
                  </ListItem>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MobileApp;
