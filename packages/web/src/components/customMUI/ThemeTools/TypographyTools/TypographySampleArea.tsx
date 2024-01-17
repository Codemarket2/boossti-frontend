import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Theme,
  ThemeProvider,
  StyledEngineProvider,
  Typography,
  Paper,
  Grid,
  createTheme,
  adaptV4Theme,
} from '@mui/material';
import { useSelector } from 'react-redux';

const PREFIX = 'TypographySampleArea';

const classes = {
  sampleAreaRoot: `${PREFIX}-sampleAreaRoot`,
  sampleAreaPaper: `${PREFIX}-sampleAreaPaper`,
  text: `${PREFIX}-text`,
  smallText: `${PREFIX}-smallText`,
};

const StyledStyledEngineProvider = styled(StyledEngineProvider)(({ theme }) => ({
  [`& .${classes.sampleAreaRoot}`]: {
    overflow: 'auto',
    maxHeight: 200,
    paddingLeft: 4,
  },

  [`& .${classes.sampleAreaPaper}`]: {
    padding: theme.spacing(0.5),
  },

  [`& .${classes.text}`]: {
    transition: theme.transitions.create('font-size'),
  },

  [`& .${classes.smallText}`]: {
    // used when the variant is minimized
    fontSize: '1rem',
  },
}));

function TypographySampleArea({ variant, bgText, paperText, smallPreview, ...typographyProps }) {
  const themeObject = createTheme(adaptV4Theme(useSelector(({ setting }: any) => setting.theme)));
  const typographyClassName = `${typographyProps.className} ${classes.text} ${
    smallPreview ? classes.smallText : ''
  }`;
  return (
    <StyledStyledEngineProvider injectFirst>
      <ThemeProvider theme={themeObject}>
        <Paper
          variant="outlined"
          className={classes.sampleAreaRoot}
          style={{
            backgroundColor: themeObject.palette.background.default,
          }}
        >
          <Grid container wrap="nowrap" alignItems="baseline">
            <Grid item>
              <Typography variant={variant} {...typographyProps} className={typographyClassName}>
                {bgText}
              </Typography>
            </Grid>
            <Grid item>
              <Paper variant="outlined" square className={classes.sampleAreaPaper}>
                <Typography variant={variant} {...typographyProps} className={typographyClassName}>
                  {paperText}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    </StyledStyledEngineProvider>
  );
}

export default TypographySampleArea;
