/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import SignupCover from '../src/views/SignupCover';
import Minimal from '../src/layouts/Minimal';
import WithLayout from '../src/WithLayout';

const SignupCoverPage = (): JSX.Element => {
  return <WithLayout component={SignupCover} layout={Minimal} />;
};

export default SignupCoverPage;
