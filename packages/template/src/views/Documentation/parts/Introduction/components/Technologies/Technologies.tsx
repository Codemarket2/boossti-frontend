import React from 'react';
import { makeStyles, List, Chip } from '@material-ui/core';
import { SectionHeader } from '../../../../../../components/molecules';

const useStyles = makeStyles((theme) => ({
  fontWeightBold: {
    fontWeight: 'bold',
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  list: {
    marginBottom: theme.spacing(-1),
  },
}));

const Technologies = ({ className, ...rest }: any): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title="Build with"
        align="left"
        titleProps={{
          className: classes.fontWeightBold,
          color: 'textPrimary',
        }}
        disableGutter
      />
      <List className={classes.list}>
        <Chip label="React" className={classes.chip} />
        <Chip label="Material-UI" className={classes.chip} />
        <Chip label="React Scripts" className={classes.chip} />
        <Chip label="NextJS" className={classes.chip} />
        <Chip label="GatsbyJS" className={classes.chip} />
        <Chip label="TypeScript" className={classes.chip} />
        <Chip label="Figma & Sketch" className={classes.chip} />
      </List>
    </div>
  );
};

export default Technologies;
