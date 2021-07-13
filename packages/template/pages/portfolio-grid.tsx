/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import PortfolioGrid from '../src/views/PortfolioGrid';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const PortfolioGridPage = (): JSX.Element => {
  return <WithLayout component={PortfolioGrid} layout={Main} />;
};

export default PortfolioGridPage;
