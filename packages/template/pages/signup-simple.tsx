/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import SignupSimple from '../src/views/SignupSimple';
import Minimal from '../src/layouts/Minimal';
import WithLayout from '../src/WithLayout';

const SignupSimplePage = (): JSX.Element => {
  return <WithLayout component={SignupSimple} layout={Minimal} />;
};

export default SignupSimplePage;
