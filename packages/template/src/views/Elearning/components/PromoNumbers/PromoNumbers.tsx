import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Typography } from '@material-ui/core';
import { SectionHeader } from '../../../../components/molecules';
import { CardPromo } from '../../../../components/organisms';

const PromoNumbers = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title={
          <span>
            Our global class is open{' '}
            <Typography component="span" variant="inherit" color="primary">
              for all
            </Typography>
          </span>
        }
        subtitle="The best way to learn is by using skills. That's why every class has a project that lets you practice and get feedback."
        fadeUp
      />
      <Grid container spacing={isMd ? 4 : 2}>
        {data.map((item: any, index: number) => (
          <Grid
            key={index}
            item
            container
            alignItems="center"
            direction="column"
            xs={12}
            sm={6}
            md={3}
            data-aos="fade-up">
            <CardPromo
              variant="outlined"
              liftUp
              align={isMd ? 'left' : 'center'}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              fontIconClass={item.icon}
              color={item.color}
              titleColor="primary"
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PromoNumbers;
