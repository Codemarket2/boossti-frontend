import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SectionHeader, OverlapedImages } from '../../../../components/molecules';

const Spaces = ({ className, ...rest }: ViewComponentProps): JSX.Element => (
  <div className={className} {...rest}>
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <SectionHeader
          label="SCALABLE"
          title={
            <span>
              <Typography color="secondary" variant="inherit" component="span">
                Learn about{' '}
              </Typography>
              herbs, supplements, alternate treatements.
            </span>
          }
          subtitle="Know what herbs, supplements & alternate treatments are good for you."
          align="left"
          fadeUp
          disableGutter
        />
      </Grid>
      <Grid item xs={12} md={6} data-aos="fade-up">
        <OverlapedImages
          image1={{
            src: require('../../../../assets/images/custom/place1@2x.jpeg'),
            srcSet: require('../../../../assets/images/custom/place1@2x.jpeg'),
            alt: '...',
          }}
          image2={{
            src: require('../../../../assets/images/custom/place2@2x.jpeg'),
            srcSet: require('../../../../assets/images/custom/place2@2x.jpeg'),
            alt: '...',
          }}
          image3={{
            src: require('../../../../assets/images/custom/place3@2x.jpeg'),
            srcSet: require('../../../../assets/images/custom/place3@2x.jpeg'),
            alt: '...',
          }}
        />
      </Grid>
    </Grid>
  </div>
);

export default Spaces;
