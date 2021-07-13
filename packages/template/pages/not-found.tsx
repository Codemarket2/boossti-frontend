/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import NotFound from '../src/views/NotFound';
import Minimal from '../src/layouts/Minimal';
import WithLayout from '../src/WithLayout';

const NotFoundPage = (): JSX.Element => {
  return <WithLayout component={NotFound} layout={Minimal} />;
};

export default NotFoundPage;
