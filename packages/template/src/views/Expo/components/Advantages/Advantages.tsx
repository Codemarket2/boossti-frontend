import React from 'react';
import { Grid, colors } from '@material-ui/core';
import { IconAlternate } from '../../../../components/molecules';
import { DescriptionListIcon } from '../../../../components/organisms';

const Advantages = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => (
  <div className={className} {...rest}>
    <Grid container spacing={4}>
      {data.map((item: any, index: number) => (
        <Grid key={index} item xs={12} md={3} data-aos={'fade-up'}>
          <DescriptionListIcon
            title={item.title}
            subtitle={item.subtitle}
            icon={<IconAlternate fontIconClass={item.icon} size="medium" color={colors.indigo} />}
            align="left"
          />
        </Grid>
      ))}
    </Grid>
  </div>
);

export default Advantages;
