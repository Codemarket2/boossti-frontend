/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import IndexView from '../src/views/IndexView';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const IndexPage = (): JSX.Element => {
  return <WithLayout component={IndexView} layout={Main} />;
};

export default IndexPage;
