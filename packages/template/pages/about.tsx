/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import About from '../src/views/About';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const AboutPage = (): JSX.Element => {
  return <WithLayout component={About} layout={Main} />;
};

export default AboutPage;
