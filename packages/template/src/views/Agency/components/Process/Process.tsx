import React from 'react';
import clsx from 'clsx';
import { Button } from '@material-ui/core';
import { SectionHeader } from '../../../../components/molecules';

const Process = ({ className, ...rest }: ViewComponentProps): JSX.Element => (
  <div className={clsx('jarallax', className)} {...rest}>
    <SectionHeader
      title="Our process"
      titleVariant="h2"
      subtitle="We are a small agency of talented designers & developers. Unlike teams from big agencies, we will treat your project as ours. We will walk you through our smooth and simple process."
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

export default Process;
