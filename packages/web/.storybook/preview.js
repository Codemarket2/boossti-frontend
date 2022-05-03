// Global CSS
// import '../src/styles/styles.css';

// CSS from node modules
import 'bootstrap/dist/css/bootstrap.min.css';
import { MockedProvider } from '@apollo/client/testing';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  apolloClient: {
    MockedProvider,
    // any props you want to pass to MockedProvider on every story
  },
};
