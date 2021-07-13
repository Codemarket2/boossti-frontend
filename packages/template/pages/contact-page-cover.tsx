/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import ContactPageCover from '../src/views/ContactPageCover';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const ContactCoverPage = (): JSX.Element => {
  return <WithLayout component={ContactPageCover} layout={Main} />;
};

export default ContactCoverPage;
