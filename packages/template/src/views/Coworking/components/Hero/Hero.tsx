import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useMediaQuery, Button, Typography } from '@material-ui/core';
import { SectionHeader, SwiperImage } from '../../../../components/molecules';
import { HeroShaped } from '../../../../components/organisms';

const useStyles = makeStyles((theme) => ({
  swiperNavButton: {
    width: `${theme.spacing(3)}px !important`,
    height: `${theme.spacing(3)}px !important`,
    padding: `${theme.spacing(2)}px !important`,
  },
}));

const Hero = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <HeroShaped
        leftSide={
          <SectionHeader
            title={
              <span>
                12-Step Program to{' '}
                <Typography component="span" variant="inherit" color="primary">
                  Survive Cancer
                </Typography>
              </span>
            }
            subtitle="Learn from other cancer patients and cancer surviors."
            ctaGroup={[
              <Button variant="contained" color="primary" size={isMd ? 'large' : 'medium'}>
                JOIN
              </Button>,
              <Button variant="outlined" color="primary" size={isMd ? 'large' : 'medium'}>
                Browse
              </Button>,
            ]}
            align="left"
            titleVariant="h3"
          />
        }
        rightSide={
          <SwiperImage
            navigationButtonStyle={classes.swiperNavButton}
            items={[
              {
                src: 'https://assets.maccarianagency.com/the-front/photos/coworking/place2.jpg',
                srcSet:
                  'https://assets.maccarianagency.com/the-front/photos/coworking/place2@2x.jpg 2x',
                alt: '...',
              },
              {
                src: 'https://assets.maccarianagency.com/the-front/photos/coworking/place1.jpg',
                srcSet:
                  'https://assets.maccarianagency.com/the-front/photos/coworking/place1@2x.jpg 2x',
                alt: '...',
              },
              {
                src: 'https://assets.maccarianagency.com/the-front/photos/coworking/place3.jpg',
                srcSet:
                  'https://assets.maccarianagency.com/the-front/photos/coworking/place3@2x.jpg 2x',
                alt: '...',
              },
            ]}
          />
        }
      />
    </div>
  );
};

export default Hero;
