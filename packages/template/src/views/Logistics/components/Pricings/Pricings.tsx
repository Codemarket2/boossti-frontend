import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Typography, Button } from '@material-ui/core';
import { Icon } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';
import { CardPricingStandard } from '../../../../components/organisms';

const Pricings = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title="Our pricing"
        subtitle="Keep track of what's happening with your data, change permissions, and run reports against your data anywhere in the world."
        data-aos="fade-up"
      />
      <Grid container spacing={isMd ? 4 : 2}>
        {data.map((item: any, index: number) => (
          <Grid item xs={12} md={4} data-aos="fade-up" key={index}>
            <CardPricingStandard
              variant="outlined"
              withShadow={item.isHighlighted ? true : false}
              title={item.title}
              liftUp
              subtitle={item.subtitle}
              priceComponent={
                <div>
                  <Typography variant="h3" component="span">
                    {item.price}
                  </Typography>
                  <Typography component="span" variant="subtitle1">
                    {item.priceSuffix}
                  </Typography>
                </div>
              }
              features={item.features}
              featureCheckComponent={
                <Icon
                  fontIconClass="far fa-check-circle"
                  fontIconColor={theme.palette.primary.main}
                />
              }
              cta={
                <Button
                  color="primary"
                  variant={item.isHighlighted ? 'contained' : 'outlined'}
                  fullWidth
                  size="large">
                  Subscribe now
                </Button>
              }
              disclaimer={item.disclaimer}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Pricings;
