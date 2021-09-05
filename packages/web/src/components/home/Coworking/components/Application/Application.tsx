import React from 'react';
import { useTheme } from '@material-ui/core/styles';

import { useMediaQuery, Button, Typography } from '@material-ui/core';
import { SectionHeader, DescriptionCta } from '../../../components/molecules';

const Application = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title={
          <span>
            <Typography component="span" variant="inherit" color="primary">
              Everything
            </Typography>{' '}
            your team could need.
          </span>
        }
        subtitle="We make sure to include all the amenities and niceties that a growing startup could possibly need."
        align="left"
      />
      <DescriptionCta
        title="Apply in 15 minutes"
        subtitle="Get your dream coworking space without the hassle."
        primaryCta={
          <Button variant="contained" color="primary" size={isMd ? 'large' : 'medium'}>
            Apply now
          </Button>
        }
        secondaryCta={
          <Button variant="outlined" color="primary" size={isMd ? 'large' : 'medium'}>
            Learn More
          </Button>
        }
        align={'left'}
      />
    </div>
  );
};

export default Application;
