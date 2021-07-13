/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import Agency from '../src/views/Agency';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const AgencyPage = (): JSX.Element => {
  return <WithLayout component={Agency} layout={Main} />;
};

export default AgencyPage;
