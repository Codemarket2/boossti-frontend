import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';
import { SectionHeader, IconAlternate, TypedText } from '../../../../components/molecules';
import { CardCategory } from '../../../../components/organisms';

const useStyles = makeStyles(() => ({
  typed: {
    fontWeight: 'bold',
  },
}));

const Categories = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title={
          <>
            Explore by category <br /> and find the best jobs {isMd ? null : <br />} for&nbsp;
            <TypedText
              component="span"
              variant="h4"
              color="secondary"
              className={classes.typed}
              typedProps={{
                strings: [
                  'Web Developers.',
                  'UI/UX Designers.',
                  'Business Analists.',
                  'Scrum Masters.',
                  'Finance & Sales',
                ],
                typeSpeed: 50,
                loop: true,
              }}
            />
          </>
        }
        align="left"
      />
      <Grid container spacing={isMd ? 4 : 1}>
        {data.map((item: any, index: number) => (
          <Grid
            key={index}
            item
            container
            alignItems="center"
            direction="column"
            xs={6}
            sm={6}
            md={3}
            data-aos="fade-up">
            <CardCategory
              variant="outlined"
              liftUp
              align="left"
              title={item.title}
              icon={
                <IconAlternate fontIconClass={item.icon} size="medium" color={item.iconColor} />
              }
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Categories;
