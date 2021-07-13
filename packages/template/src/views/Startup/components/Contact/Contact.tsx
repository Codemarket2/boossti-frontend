import React from 'react';
import { Grid } from '@material-ui/core';
import { SectionHeader } from '../../../../components/molecules';
import { CardBase, ContactForm } from '../../../../components/organisms';

const Contact = ({ className, ...rest }: ViewComponentProps): JSX.Element => (
  <div className={className} data-aos="fade-up" {...rest}>
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <SectionHeader
          title="Would you like to collaborate on a project?"
          subtitle="Get in touch beside and we will get back to you soon to connect about your project."
          align="left"
          disableGutter
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardBase withShadow liftUp>
          <ContactForm />
        </CardBase>
      </Grid>
    </Grid>
  </div>
);

export default Contact;
