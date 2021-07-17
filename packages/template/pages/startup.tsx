/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import Startup from '../src/views/Startup';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const StartupPage = (): JSX.Element => {
  return <WithLayout component={Startup} layout={Main} />;
};

export default StartupPage;
