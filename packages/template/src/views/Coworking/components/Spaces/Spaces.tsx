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
                Flexible office space{' '}
              </Typography>
              means growing your team is easy.
            </span>
          }
          subtitle="Rather than worrying about switching offices every couple years, you can instead stay in the same location and grow-up from your shared coworking space to an office that takes up an entire floor."
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
