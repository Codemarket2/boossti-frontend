import React from 'react';
import { Grid, Button, colors } from '@material-ui/core';
import { SectionHeader, IconAlternate } from '../../../../components/molecules';
import { DescriptionListIcon } from '../../../../components/organisms';

const Services = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => (
  <div className={className} data-aos="fade-up" {...rest}>
    <SectionHeader
      title="What we do"
      subtitle="We are a small agency of talented designers & developers. Unlike teams from big agencies, we will treat your project as ours. We will walk you through our smooth and simple process."
      subtitleProps={{
        variant: 'body1',
        color: 'textPrimary',
      }}
      fadeUp
    />
    <Grid container spacing={4}>
      {data.map((item: any, index: number) => (
        <Grid
          key={index}
          item
          container
          alignItems="center"
          direction="column"
          xs={12}
          sm={6}
          md={4}
          data-aos="fade-up">
          <DescriptionListIcon
            icon={<IconAlternate fontIconClass={item.icon} color={colors.indigo} />}
            title={item.title}
            subtitle={item.description}
            align="left"
          />
        </Grid>
      ))}
      <Grid item container xs={12} justify="center">
        <Button variant="contained" size="large" color="primary">
          hire us
        </Button>
      </Grid>
    </Grid>
  </div>
);

export default Services;
