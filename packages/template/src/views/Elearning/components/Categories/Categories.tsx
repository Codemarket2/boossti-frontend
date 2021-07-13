import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Typography } from '@material-ui/core';
import { SectionHeader } from '../../../../components/molecules';
import { CardCategoryLink } from '../../../../components/organisms';

const Categories = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title={
          <span>
            Choose your course by{' '}
            <Typography color="secondary" variant="inherit" component="span">
              categories
            </Typography>
          </span>
        }
        subtitle="Browse the available course categories, choose your favourite one and start learning."
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
            <CardCategoryLink
              variant="outlined"
              align={isMd ? 'left' : 'center'}
              liftUp
              title={item.title}
              subtitle={item.subtitle}
              href="#"
              fontIconClass={item.icon}
              color={item.color}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Categories;
