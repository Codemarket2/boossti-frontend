import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Accordion, AccordionSummary, AccordionDetails, Theme, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TypographySampleArea from './TypographySampleArea';
import TypographyInput from './TypographyInput/TypographyInput';

const PREFIX = 'TypographyVariant';

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

const defaultVariantProperties = [
  'fontFamily',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'letterSpacing',
];

function TypographyVariant({ variant, text, smallPreview = false }) {
  const [expanded, setExpanded] = useState(false);

  const variantPath = `typography.${variant}`;

  return (
    <StyledAccordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.accordionSummary}
        classes={{ content: classes.accordionSummaryContent }}
      >
        <TypographySampleArea
          variant={variant}
          bgText={`${variant}.`}
          paperText={text}
          smallPreview={smallPreview && !expanded}
        />
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {defaultVariantProperties.map((property) => (
          <div key={`${variant}-${property}`}>
            <TypographyInput label={property} variantPath={variantPath} property={property} />
            <Divider />
          </div>
        ))}
      </AccordionDetails>
    </StyledAccordion>
  );
}

export default TypographyVariant;
