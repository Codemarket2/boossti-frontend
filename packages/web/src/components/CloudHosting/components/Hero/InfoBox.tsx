import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';

import Box from '@mui/material/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'white',
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
    },
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: 470,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  section: {
    marginTop: '15vh',
    paddingTop: 0,
    paddingBottom: 0,
  },
  sectionHeader: {
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('md')]: {
      maxWidth: '50%',
      width: 'calc(100vw - 625px)',
    },
  },
  textWhite: {
    color: 'white',
  },
  textBlue: {
    color: 'rgb(13,4,72)',
  },
  pieChart: {
    // alignSelf: 'flex-start',
    // maxWidth: 625,
    transform: 'translateX(-50%)',
    height: 'auto',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: '50%',
      right: 0,
      width: 'auto',
      transform: 'translateY(-50%) !important',
    },
  },
}));

const Hero = ({ className, data, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box
        sx={{
          border: '1px solid black',
          width: 300,
          minHeight: 300,
          marginLeft: '15vw',
          marginTop: '5vh',
        }}
      >
        <Box sx={{ border: '1px solid black', width: 300, marginLeft: '15vw', marginTop: '5vh' }} />
        {data.label}
      </Box>
    </div>
  );
};

export default Hero;
