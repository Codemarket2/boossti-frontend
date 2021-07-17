import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { SectionHeader } from '../../../../components/molecules';

const useStyles = makeStyles(() => ({
  textWhite: {
    color: 'white',
    textTransform: 'uppercase',
  },
}));

const Nike = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title={<span className={classes.textWhite}>Nike</span>}
        titleVariant="h1"
        subtitle={<span className={classes.textWhite}>just do it</span>}
        ctaGroup={[
          <Button variant="outlined" color="secondary" size="large">
            See portfolio
          </Button>,
        ]}
        disableGutter
        data-aos="fade-up"
      />
    </div>
  );
};

export default Nike;
