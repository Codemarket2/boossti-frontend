/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import NoSsr from '@material-ui/core/NoSsr';
import Account from '../src/views/Account';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const Component = (): JSX.Element => {
  return (
    <NoSsr>
      <Account />
    </NoSsr>
  );
};

const AccountPage = (): JSX.Element => {
  return <WithLayout component={Component} layout={Main} />;
};

export default AccountPage;
