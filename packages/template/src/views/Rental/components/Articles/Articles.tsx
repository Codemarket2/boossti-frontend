import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid } from '@material-ui/core';
import { LearnMoreLink } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';

const Articles = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container justify="center" spacing={isMd ? 4 : 2}>
        {data.map((item: any, index: number) => (
          <Grid item xs={12} md={4} key={index} data-aos="fade-up">
            <SectionHeader
              titleVariant="h6"
              title={item.title}
              subtitle={item.subtitle}
              subtitleColor="textPrimary"
              subtitleVariant="body1"
              ctaGroup={[<LearnMoreLink title="Learn more" variant="subtitle1" />]}
              align="left"
              disableGutter
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Articles;
