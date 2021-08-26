/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { LearnMoreLink } from '../../atoms';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    color: theme.palette.primary.dark,
  },
  listItem: {
    cursor: 'pointer',
  },
}));

/**
 * Component to display accordion view
 *
 * @param {*} props
 */
const Accordion = ({
  items,
  className,
  titleProps = {},
  subtitleProps = {},
  textProps = {},
  linkProps = {},
  ...rest
}: AccordionProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div {...rest} className={clsx('accordion', classes.root, className)}>
      {items.map((item) => (
        <MuiAccordion className={clsx('accordion__item-wrapper', classes.listItem)} key={item.id}>
          <MuiAccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${item.id}-content`}>
            <Grid container spacing={0} className="accorion__item-text-container">
              <Grid item xs={12} className="accorion__item-title-container">
                <Typography
                  variant="h6"
                  color="textPrimary"
                  className="accorion_item-title"
                  {...titleProps}>
                  {item.title}
                </Typography>
              </Grid>
              {item.subtitle && (
                <Grid item xs={12} className="accorion_item-subtitle-container">
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className="accorion_item-subtitle"
                    {...subtitleProps}>
                    {item.subtitle}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </MuiAccordionSummary>
          <MuiAccordionDetails>
            <Grid container spacing={2} className="accordion__collapsable-text-container">
              <Grid item xs={12} className="accordion__collapsable-text-wrapper">
                <Typography
                  variant="body1"
                  color="textPrimary"
                  className="accordion__collapsable-text"
                  {...textProps}>
                  {item.text}
                </Typography>
              </Grid>
              {item.link && (
                <Grid item xs={12} className="accordion__collapsable-link-wrapper">
                  <LearnMoreLink
                    title={item.link}
                    variant="body1"
                    className="accordion__collapsable-link"
                    {...linkProps}
                  />
                </Grid>
              )}
            </Grid>
          </MuiAccordionDetails>
        </MuiAccordion>
      ))}
    </div>
  );
};

export default Accordion;
