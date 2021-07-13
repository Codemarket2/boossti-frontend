/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import PasswordResetSimple from '../src/views/PasswordResetSimple';
import Minimal from '../src/layouts/Minimal';
import WithLayout from '../src/WithLayout';

const PasswordResetSimplePage = (): JSX.Element => {
  return <WithLayout component={PasswordResetSimple} layout={Minimal} />;
};

export default PasswordResetSimplePage;
