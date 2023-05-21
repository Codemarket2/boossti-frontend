// Global CSS
// import '../src/styles/styles.css';

// CSS from node modules
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-calendar/dist/Calendar.css';
// import 'react-clock/dist/Clock.css';
// import 'react-date-picker/dist/DatePicker.css';
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-day-picker/lib/style.css';
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';
// import 'react-toastify/dist/ReactToastify.css';
import { MockedProvider } from '@apollo/client/testing';
import { AllTheProviders } from './AllProviders';

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
  },
};

export const withMuiTheme = (Story) => (
  <AllTheProviders>
    <Story />
  </AllTheProviders>
);

export const decorators = [withMuiTheme];
