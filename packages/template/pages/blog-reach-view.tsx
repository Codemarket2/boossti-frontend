/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import BlogReachView from '../src/views/BlogReachView';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const BlogReachViewPage = (): JSX.Element => {
  return <WithLayout component={BlogReachView} layout={Main} />;
};

export default BlogReachViewPage;
