import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, colors } from '@material-ui/core';
import { IconAlternate } from '../../../../components/molecules';
import { DescriptionListIcon } from '../../../../components/organisms';

const Services = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        {data.map((item: any, index: number) => (
          <Grid key={index} item xs={12} sm={4} data-aos={'fade-up'}>
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
};

export default Services;
