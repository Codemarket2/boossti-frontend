import React from 'react';
import { Grid, Button, colors } from '@material-ui/core';
import { SectionHeader, IconAlternate } from '../../../../components/molecules';
import { CardBase, DescriptionListIcon } from '../../../../components/organisms';

const Process = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => (
  <div className={className} data-aos="fade-up" {...rest}>
    <SectionHeader
      title="Our process"
      subtitle="We are a small agency of talented designers & developers. Unlike teams from big agencies, we will treat your project as ours. We will walk you through our smooth and simple process."
      ctaGroup={[
        <Button color="primary" variant="contained" size="large">
          Contact us
        </Button>,
      ]}
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
          data-aos="fade-up">
          <CardBase liftUp variant="outlined">
            <DescriptionListIcon
              icon={<IconAlternate fontIconClass={item.icon} color={colors.indigo} />}
              title={item.title}
              subtitle={item.description}
              align="left"
            />
          </CardBase>
        </Grid>
      ))}
      <Grid item container xs={12} justify="center">
        <Button variant="contained" size="large" color="primary">
          Contact us
        </Button>
      </Grid>
    </Grid>
  </div>
);

export default Process;
