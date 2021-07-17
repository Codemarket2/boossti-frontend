/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import DesktopApp from '../src/views/DesktopApp';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const DesktopAppPage = (): JSX.Element => {
  return <WithLayout component={DesktopApp} layout={Main} />;
};

export default DesktopAppPage;
