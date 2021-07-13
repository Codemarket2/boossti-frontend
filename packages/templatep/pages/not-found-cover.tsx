/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import NotFoundCover from '../src/views/NotFoundCover';
import Minimal from '../src/layouts/Minimal';
import WithLayout from '../src/WithLayout';

const NotFoundCoverPage = (): JSX.Element => {
  return <WithLayout component={NotFoundCover} layout={Minimal} />;
};

export default NotFoundCoverPage;
