import React from 'react';
import { SectionHeader } from '../../../../components/molecules';
import { Accordion } from '../../../../components/organisms';

const Faq = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => (
  <div className={className} {...rest}>
    <SectionHeader
      title="We are here to help"
      subtitle="Checkout our F.A.Q. if you have some questions."
      fadeUp
    />
    <Accordion items={data} />
  </div>
);

export default Faq;
