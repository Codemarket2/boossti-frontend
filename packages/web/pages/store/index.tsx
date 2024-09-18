import { createTheme, CssBaseline, ThemeProvider, Container, Divider } from '@mui/material';
import React from 'react';
import getBlogTheme from '../../theme/theme';

import Footer from '../../src/components/store/Footer';
import MainContent from '../../src/components/store/MainContent';
import AppBar from '../../src/components/store/AppBar';

const StorePage = () => {
  const blogTheme = createTheme(getBlogTheme('light'));

  return (
    <ThemeProvider theme={blogTheme}>
      <CssBaseline enableColorScheme />

      <AppBar />
      <Divider />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <MainContent />
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default StorePage;
