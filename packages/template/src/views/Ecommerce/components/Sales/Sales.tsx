import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';

const useStyles = makeStyles((theme) => ({
  image: {
    objectFit: 'contain',
    height: 120,
  },
  fontWeightBold: {
    fontWeight: 'bold',
  },
  cardMedia: {
    padding: theme.spacing(2, 2, 0, 2),
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Sales = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title="The most sold products"
        subtitle="After 3 days all of your offers will arrive and you will have another 7 days to select your new company."
        subtitleColor="textPrimary"
        subtitleVariant="body1"
        data-aos="fade-up"
        align="left"
      />
      <Grid container spacing={isMd ? 4 : 2}>
        {data.map((item: any, index: number) => (
          <Grid item xs={12} sm={6} md={3} key={index} data-aos="fade-up">
            <Card>
              <CardMedia className={classes.cardMedia}>
                <Image {...item.image} alt={item.title} className={classes.image} />
              </CardMedia>
              <CardContent>
                <Typography
                  color="textPrimary"
                  variant="subtitle1"
                  className={classes.fontWeightBold}
                  align="center">
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Sales;
