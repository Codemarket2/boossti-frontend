/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import PortfolioMasonry from '../src/views/PortfolioMasonry';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const PortfolioMasonryPage = (): JSX.Element => {
  return <WithLayout component={PortfolioMasonry} layout={Main} />;
};

export default PortfolioMasonryPage;
