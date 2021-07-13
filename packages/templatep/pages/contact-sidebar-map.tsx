/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import ContactPageSidebarMap from '../src/views/ContactPageSidebarMap';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const ContactWithSidebarMapPage = (): JSX.Element => {
  return <WithLayout component={ContactPageSidebarMap} layout={Main} />;
};

export default ContactWithSidebarMapPage;
