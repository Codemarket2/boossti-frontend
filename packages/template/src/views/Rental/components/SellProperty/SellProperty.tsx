import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';
import { Section } from '../../../../components/organisms';

const useStyles = makeStyles((theme) => ({
  grid: {
    maxWidth: '100%',
    background: theme.palette.primary.dark,
  },
  textWhite: {
    color: 'white',
  },
}));

const SellProperty = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={className} {...rest}>
      <Grid container className={classes.grid}>
        <Grid item xs={12} md={6} data-aos="fade-up">
          <Image
            src="https://assets.maccarianagency.com/the-front/photos/rental/house-cover.png"
            lazy={false}
          />
        </Grid>
        <Grid item container alignItems="center" xs={12} md={6}>
          <Section>
            <SectionHeader
              title={<span className={classes.textWhite}>Want to Sell Property?</span>}
              titleVariant="h3"
              subtitle={
                <span className={classes.textWhite}>
                  Let us create a tailored strategic marketing plan and keep track of the selling
                  process.
                </span>
              }
              ctaGroup={[
                <Button variant="contained" size="large">
                  Get started
                </Button>,
              ]}
              align="left"
              disableGutter
              data-aos="fade-up"
            />
          </Section>
        </Grid>
      </Grid>
    </div>
  );
};

export default SellProperty;
