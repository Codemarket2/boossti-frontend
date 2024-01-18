import React from 'react';
import { styled } from '@mui/material/styles';
import { Accordion, AccordionSummary, AccordionDetails, Theme, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TypographySampleArea from './TypographySampleArea';
import TypographyInput from './TypographyInput/TypographyInput';

const PREFIX = 'TypographyGlobals';

const classes = {
  accordionSummary: `${PREFIX}-accordionSummary`,
  accordionSummaryContent: `${PREFIX}-accordionSummaryContent`,
  accordionDetails: `${PREFIX}-accordionDetails`,
};

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  [`& .${classes.accordionSummary}`]: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.drawer + 3,
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
  },

  [`& .${classes.accordionSummaryContent}`]: {
    maxWidth: '100%',
    overflow: 'auto',
  },

  [`& .${classes.accordionDetails}`]: {
    flexDirection: 'column',
    '&> *': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const defaultGlobalProperties = [
  'fontFamily',
  'fontSize',
  'fontWeightLight',
  'fontWeightRegular',
  'fontWeightMedium',
  'fontWeightBold',
  'htmlFontSize',
];

function TypographyGlobals() {
  return (
    <StyledAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.accordionSummary}
        classes={{ content: classes.accordionSummaryContent }}
      >
        <TypographySampleArea
          variant="body1"
          bgText="Base Typography"
          paperText="Styles"
          smallPreview={undefined}
        />
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {defaultGlobalProperties.map((property) => (
          <div key={`base-text-${property}`}>
            <TypographyInput label={property} variantPath="typography" property={property} />
            <Divider />
          </div>
        ))}
      </AccordionDetails>
    </StyledAccordion>
  );
}

export default TypographyGlobals;
