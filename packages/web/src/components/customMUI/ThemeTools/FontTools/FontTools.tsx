import React from 'react';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Chip, Theme } from '@mui/material';
import AddFontInput from './AddFontInput';
import PopularFontList from './PopularFontList';

const PREFIX = 'FontTools';

const classes = {
  popularFontList: `${PREFIX}-popularFontList`,
  loadedFontContent: `${PREFIX}-loadedFontContent`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.popularFontList}`]: {
    flexDirection: 'column',
  },

  [`& .${classes.loadedFontContent}`]: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
    maxHeight: 200,
    overflowY: 'auto',
  },
}));

function FontTools() {
  // const loadedFonts = useSelector((state: RootState) => state.loadedFonts)
  // const currentFonts = useSelector(
  //   (state: RootState) => state.savedThemes[state.themeId].fonts
  // )

  return (
    <Root>
      <Accordion>
        <AccordionSummary>
          <AddFontInput />
        </AccordionSummary>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body2">Popular Fonts</Typography>
        </AccordionSummary>
        <AccordionDetails>{/* <PopularFontList /> */}</AccordionDetails>
      </Accordion>
      {/* <Accordion defaultExpanded={currentFonts.length < 5}> */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Fonts used in current theme
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.loadedFontContent}>
            {/* {currentFonts.map(font => (
              <Chip
                label={font}
                key={font}
                size="small"
                style={{ fontFamily: font }}
                />
              ))} */}
            <Chip label="Font" size="small" />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {/* {`Loaded and Available Fonts (${loadedFonts.size})`} */}
          Loaded and Available Fonts
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.loadedFontContent}>
            {/* {[...loadedFonts].map(font => ( */}
            {/* <Chip
                label={font}
                key={font}
                size="small"
                style={{ fontFamily: font }}
              /> */}
            {/* // ))} */}
            <Chip label="Font" size="small" />
          </div>
        </AccordionDetails>
      </Accordion>
    </Root>
  );
}

export default FontTools;
