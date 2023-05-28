import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import Box from '@mui/material/Box';
import CardFlip from '../CardFlip';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'white',
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
    },
    width: '50%',
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

const InfoBox = ({ className, boxNumber, data, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const [dataObj, setDataObj] = useState(data);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box
        borderRadius="10%"
        sx={{
          border: '2px solid #758614',
          width: 400,
          minHeight: 360,
          // marginLeft: '10vw',
          // marginTop: '5vh',
          backgroundColor: 'rgb(198,212,125)',
        }}
      >
        <Box sx={{ width: 400, minHeight: 100 }}>
          <Typography variant="h5" align="center">
            {dataObj?.heading ? dataObj.heading : ''}
          </Typography>
        </Box>
        <Box
          borderTop="2px solid #758614"
          sx={{ width: 395, minHeight: 225, backgroundColor: 'white', display: 'inline-block' }}
        >
          <Typography>{dataObj?.subHeading}</Typography>
          {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
            <img src={dataObj?.imgOne ? dataObj.imgOne : ''} height={200} width={200} alt="what" />
            <img src={dataObj?.imgTwo ? dataObj.imgTwo : ''} height={200} width={195} alt="hows" />
          </div> */}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <CardFlip />
            <CardFlip />
          </div>
        </Box>
        {/* <Box sx={{ width: 400, minHeight: 100 }}></Box> */}
      </Box>
    </div>
  );
};

export default InfoBox;

// 2.User Research
// 2 pictures WHY? and HOW?
