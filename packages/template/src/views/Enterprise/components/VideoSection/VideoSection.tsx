import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { Grid, Button } from '@material-ui/core';
import { SectionHeader } from '../../../../components/molecules';

const useStyles = makeStyles((theme) => ({
  videoIframe: {
    boxShadow: `0 5px 15px 0 ${theme.palette.cardShadow}`,
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none',
    },
  },
}));

const VideoSection = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container justify="space-between" spacing={isMd ? 4 : 2}>
        <Grid item xs={12} md={6} data-aos={'fade-up'}>
          <SectionHeader
            title="Launch Your Website Marketing Platform"
            subtitle="We help digital agencies, local business and managed service providers to have the best Website Marketing service."
            ctaGroup={[
              <Button variant="contained" color="primary" size={isMd ? 'large' : 'medium'}>
                see plans & pricings
              </Button>,
            ]}
            align={isMd ? 'left' : 'center'}
            disableGutter
            titleVariant="h3"
          />
        </Grid>
        <Grid item xs={12} md={6} data-aos={'fade-up'}>
          <iframe
            className={classes.videoIframe}
            title="video"
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/ClIbn_IF31U"
            frameBorder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default VideoSection;
