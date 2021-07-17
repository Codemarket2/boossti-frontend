/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import Pricing from '../src/views/Pricing';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const PricingPage = (): JSX.Element => {
  return <WithLayout component={Pricing} layout={Main} />;
};

export default PricingPage;
