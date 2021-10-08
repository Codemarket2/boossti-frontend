import { useState, useEffect } from 'react';
import { Paper, CircularProgress } from '@material-ui/core';
// import { ThemeProvider } from '@material-ui/core/styles';
// import getTheme from './theme';
// // import CssBaseline from '@material-ui/core/CssBaseline';

import AOS from 'aos';

export const useDarkMode = () => {
  const [themeMode, setTheme] = useState('light');
  const [mountedComponent, setMountedComponent] = useState(false);

  const setMode = (mode) => {
    // window.localStorage.setItem('themeMode', mode);
    localStorage.setItem('darkMode', JSON.stringify(mode === 'dark'));
    setTheme(mode);
  };

  const themeToggler = () => {
    themeMode === 'light' ? setMode('dark') : setMode('light');
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('darkMode');
    Boolean(JSON.parse(localTheme)) ? setTheme('dark') : setMode('light');
    // const localTheme = window.localStorage.getItem('themeMode');
    // localTheme ? setTheme(localTheme) : setMode('light');
    setMountedComponent(true);
    AOS.refresh();
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [themeMode]);

  return [themeMode, themeToggler, mountedComponent];
};

interface Props {
  layout: any;
  component: any;
  // All other props
  [x: string]: any;
}

export default function WithLayout({
  component: Component,
  layout: Layout,
  ...rest
}: Props): JSX.Element {
  useEffect(() => {
    // Remove the server-side injected CSS.
    // const jssStyles = document.querySelector('#jss-server-side');
    // if (jssStyles) {
    //   jssStyles.parentElement.removeChild(jssStyles);
    // }

    AOS.init({
      once: true,
      delay: 50,
      duration: 500,
      easing: 'ease-in-out',
    });
  }, []);

  const [themeMode, themeToggler, mountedComponent] = useDarkMode();
  useEffect(() => {
    AOS.refresh();
  }, [mountedComponent]);

  if (mountedComponent) {
    return (
      <Paper elevation={0}>
        <Layout themeMode={themeMode} themeToggler={themeToggler}>
          <Component themeMode={themeMode} {...rest} />
        </Layout>
      </Paper>
    );
  }
  return <CircularProgress />;
}
