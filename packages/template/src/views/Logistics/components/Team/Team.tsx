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
  image: {
    maxWidth: 450,
    height: 'auto',
  },
}));

const Team = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2} direction={isMd ? 'row' : 'column-reverse'}>
        <Grid item xs={12} md={6} data-aos="fade-up">
          <Grid container alignItems="flex-start" justify="center" direction="column">
            <SectionHeader
              title="Our leaders will help you"
              subtitle="We develop intelligent solutions for companies to reduce their operational costs, increase their profitability and improve service quality."
              subtitleColor="textPrimary"
              align="left"
              disableGutter
            />
            <Grid container spacing={0}>
              {data.map((item: any, index: number) => (
                <Grid item xs={12} key={index} data-aos="fade-up">
                  <ListItem disableGutters>
                    <ListItemAvatar>
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
        <Grid
          item
          container
          justify={isMd ? 'flex-end' : 'center'}
          alignItems="center"
          xs={12}
          md={6}
          data-aos="fade-up">
          <Image
            src="https://assets.maccarianagency.com/the-front/illustrations/team.png"
            srcSet="https://assets.maccarianagency.com/the-front/illustrations/team@2x.png 2x"
            alt="team"
            className={classes.image}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Team;
