import React from 'react';
import { SwiperNumber } from '../../../../components/molecules';

const PromoNumbers = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => (
  <div className={className} {...rest}>
    <SwiperNumber items={data} />
  </div>
);

export default PromoNumbers;
