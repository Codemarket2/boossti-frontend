import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Button } from '@material-ui/core';
import { SectionHeader } from '../../../../components/molecules';
import { CardJobMinimal } from '../../../../components/organisms';

const Jobs = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title="We are hiring"
        subtitle="Keep track of what's happening with your data, change permissions, and run reports against your data anywhere in the world."
        subtitleColor="textPrimary"
        ctaGroup={[
          <Button color="primary" size="large" variant="contained">
            About the company
          </Button>,
        ]}
        data-aos="fade-up"
      />
      <Grid container spacing={isMd ? 4 : 2}>
        {data.map((item: any, index: number) => (
          <Grid item xs={12} key={index}>
            <CardJobMinimal
              title={item.title}
              subtitle={`${item.location} / ${item.type}`}
              showArrow
              titleProps={{
                variant: 'h6',
              }}
              subtitleProps={{
                variant: 'subtitle1',
              }}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Jobs;
