import React from 'react';
import DesignCompany from '../src/views/DesignCompany';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const DesignCompanyPage = (): JSX.Element => {
  return <WithLayout component={DesignCompany} layout={Main} />;
};

export default DesignCompanyPage;
