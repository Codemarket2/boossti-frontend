import React from 'react';
import clsx from 'clsx';
import { Button } from '@material-ui/core';
import { SectionHeader } from '../../../../components/molecules';

const Welcome = ({ className, ...rest }: ViewComponentProps): JSX.Element => (
  <div className={clsx('jarallax', className)} {...rest}>
    <SectionHeader
      title="We craft beautiful websites and digital products."
      titleVariant="h2"
      subtitle="We design, develop and launch websites and products for startups, companies and ourselves."
      ctaGroup={[
        <Button variant="contained" color="primary" size="large">
          Contact us
        </Button>,
      ]}
      disableGutter
      data-aos="fade-up"
    />
  </div>
);

export default Welcome;
