/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import SigninCover from '../src/views/SigninCover';
import Minimal from '../src/layouts/Minimal';
import WithLayout from '../src/WithLayout';

const SigninCoverPage = (): JSX.Element => {
  return <WithLayout component={SigninCover} layout={Minimal} />;
};

export default SigninCoverPage;
