/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import Logistics from '../src/views/Logistics';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const LogisticsPage = (): JSX.Element => {
  return <WithLayout component={Logistics} layout={Main} />;
};

export default LogisticsPage;
