import { createTheme, DeprecatedThemeOptions, Theme, adaptV4Theme } from '@mui/material';

export const defaultThemeOptions: DeprecatedThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5', // the default primary color
    },
    secondary: {
      main: '#f50057', // the default secondary color
    },
  },
};

export const defaultTheme: Theme = createTheme();

export const themeConfig: DeprecatedThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
  props: {
    MuiAccordion: {
      square: true,
      TransitionProps: {
        unmountOnExit: true,
      },
    },
  },
  overrides: {
    MuiAccordion: {
      root: {
        border: '1px solid rgba(255, 255, 255, .125)',
        boxShadow: 'none',
        transition: defaultTheme.transitions.create('margin-left'),
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
        '&$expanded': {
          margin: 'auto',
        },
        '&$disabled': {
          marginLeft: 32,
        },
      },
    },
    MuiAccordionSummary: {
      root: {
        borderBottom: '1px solid rgba(255, 255, 255, .125)',
        minHeight: 56,
        '&$expanded': {
          minHeight: 56,
        },
      },
      content: {
        alignItems: 'center',
        justifyContent: 'space-between',
        '&$expanded': {
          margin: '12px 0',
        },
      },
    },
    MuiAccordionDetails: {
      root: {
        backgroundColor: '#212121',
      },
    },
    MuiDrawer: {
      docked: {
        '& $paper': {
          position: 'static',
        },
      },
      paper: {},
    },
    MuiPopover: {
      paper: {
        backgroundColor: '#121212',
      },
    },
  },
};

export default createTheme(adaptV4Theme(themeConfig));
