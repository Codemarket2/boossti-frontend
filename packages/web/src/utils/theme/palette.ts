// eslint-disable-next-line
import { typography } from './typography';

export const light = {
  palette: {
    alternate: {
      main: 'rgb(247, 249, 250)',
      dark: '#e8eaf6',
    },

    cardShadow: 'rgba(23, 70, 161, .11)',
    mode: 'light',
    primary: {
      // main: '#3f51b5',
      main: '#6200EE',
      /* light: 'rgb(71, 145, 219)',
      dark: 'rgb(17, 82, 147)', */
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffb74d',
      // main: '#f9b934',
      // main: '#03DAC6',
      main: '#f50057',
      dark: '#f57c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    text: {
      primary: '#050505',
      secondary: '#718096',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
      level2: '#F0F2F5',
      level1: '#FFFFFF',
      footer: '#1b1642',
    },
  },
  layout: {
    contentWidth: 1236,
  },
  typography,
};

export const dark = {
  palette: {
    alternate: {
      main: '#2D3748',
      dark: '#24242b',
    },
    cardShadow: 'rgba(0, 0, 0, .11)',
    common: {
      black: '#000',
      white: '#fff',
    },
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: 'rgb(166, 212, 250)',
      dark: 'rgb(100, 141, 174)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      light: '#ffb74d',
      main: '#f9b934',
      dark: '#f57c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    text: {
      primary: '#EEEEEF',
      secondary: '#AEB0B4',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: {
      paper: '#1A202C',
      default: '#121212',
      level2: '#333',
      level1: '#2D3748',
      footer: '#18181f',
    },
  },
  layout: {
    contentWidth: 1236,
  },
  typography,
};
