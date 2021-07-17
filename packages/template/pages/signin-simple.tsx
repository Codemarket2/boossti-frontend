/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import SigninSimple from '../src/views/SigninSimple';
import Minimal from '../src/layouts/Minimal';
import WithLayout from '../src/WithLayout';

const SigninSimplePage = (): JSX.Element => {
  return <WithLayout component={SigninSimple} layout={Minimal} />;
};

export default SigninSimplePage;
