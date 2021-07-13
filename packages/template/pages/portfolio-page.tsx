/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import PortfolioPage from '../src/views/PortfolioPage';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const PortfolioViewPage = (): JSX.Element => {
  return <WithLayout component={PortfolioPage} layout={Main} />;
};

export default PortfolioViewPage;
