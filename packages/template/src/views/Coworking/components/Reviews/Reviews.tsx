import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useMediaQuery, Grid, Button, Typography, colors } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader, IconAlternate } from '../../../../components/molecules';
import { CardReview } from '../../../../components/organisms';

const useStyles = makeStyles(() => ({
  sectionHeadlineStars: {
    maxWidth: 120,
  },
}));

const Reviews = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        overline={
          <Image
            src="https://assets.maccarianagency.com/the-front/illustrations/rated-by-our-customer.png"
            alt="rating"
            className={classes.sectionHeadlineStars}
            width="auto"
          />
        }
        title={
          <span>
            <Typography color="secondary" variant="inherit" component="span">
              Rated 5 out of 5
            </Typography>{' '}
            stars by our customers!
          </span>
        }
        subtitle="Companies from across the globe have had fantastic experiences using TheFront. Here’s what they have to say."
        align="center"
      />
      <Grid container spacing={isMd ? 4 : 2}>
        {data.map((review: any, index: number) => (
          <Grid
            key={index}
            item
            container
            alignItems="center"
            direction="column"
            xs={12}
            md={4}
            data-aos="fade-up">
            <CardReview
              variant="outlined"
              text={review.feedback}
              icon={<IconAlternate color={colors.indigo} fontIconClass="fas fa-quote-right" />}
              authorName={review.authorName}
              authorTitle={review.authorOccupation}
              authorPhoto={review.authorPhoto}
            />
          </Grid>
        ))}
        <Grid item container xs={12} justify="center">
          <Button variant="outlined" size={isMd ? 'large' : 'medium'} color="secondary">
            See all reviews
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Reviews;
