/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import Expo from '../src/views/Expo';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const ExpoPage = (): JSX.Element => {
  return <WithLayout component={Expo} layout={Main} />;
};

export default ExpoPage;
