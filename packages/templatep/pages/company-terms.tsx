/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import CompanyTerms from '../src/views/CompanyTerms';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const CompanyTermsPage = (): JSX.Element => {
  return <WithLayout component={CompanyTerms} layout={Main} />;
};

export default CompanyTermsPage;
