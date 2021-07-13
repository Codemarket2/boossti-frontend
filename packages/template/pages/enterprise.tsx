/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import Enterprise from '../src/views/Enterprise';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const EnterprisePage = (): JSX.Element => {
  return <WithLayout component={Enterprise} layout={Main} />;
};

export default EnterprisePage;
