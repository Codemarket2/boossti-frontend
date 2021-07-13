/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import CareerListing from '../src/views/CareerListing';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const CareerListingPage = (): JSX.Element => {
  return <WithLayout component={CareerListing} layout={Main} />;
};

export default CareerListingPage;
