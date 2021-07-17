/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import Ecommerce from '../src/views/Ecommerce';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const EcommercePage = (): JSX.Element => {
  return <WithLayout component={Ecommerce} layout={Main} />;
};

export default EcommercePage;
