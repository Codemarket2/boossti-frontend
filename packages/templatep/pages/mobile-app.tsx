/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import MobileApp from '../src/views/MobileApp';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const MobileAppPage = (): JSX.Element => {
  return <WithLayout component={MobileApp} layout={Main} />;
};

export default MobileAppPage;
