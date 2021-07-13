import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';

const useStyles = makeStyles(() => ({
  promoLogo: {
    maxWidth: 120,
  },
}));

const TrustedCompanies = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12} md={6}>
          <SectionHeader
            title="Trusted by Millions of People"
            subtitle="We are registered as a distributor with AMFI, as an investment advisor with SEBI and platform partners with BSE."
            fadeUp
            disableGutter
            align={isMd ? 'left' : 'center'}
          />
        </Grid>
        <Grid item container xs={12} md={6}>
          {data.map((partner: any, index: number) => (
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              xs={4}
              key={index}
              data-aos="fade-up">
              <Image
                src={partner.logo}
                alt={partner.name}
                className={classes.promoLogo}
                lazy={false}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default TrustedCompanies;
