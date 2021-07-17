/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import JobListing from '../src/views/JobListing';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const JobListingPage = (): JSX.Element => {
  return <WithLayout component={JobListing} layout={Main} />;
};

export default JobListingPage;
