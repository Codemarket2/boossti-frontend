import * as React from 'react';
import App from './AppWrapper';
import { mount } from '@cypress/react';

export const customMount = (Component: any, props: any = {}) => {
  return mount(<App Component={() => <Component {...props} />} />);
};
