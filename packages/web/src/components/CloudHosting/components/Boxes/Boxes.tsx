import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@material-ui/core';
import Close from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InfoBox from './InfoBox';

interface IData {
  label: string;
  value: number;
}
interface IProps {
  data: IData;
  setIsHovered: any;
  onClose?: any;
}
interface IObj {
  heading: string;
  subHeading?: string;
  imgOne: string;
  imgTwo: string;
}
const useStyles = makeStyles((theme) => ({
  closeButton: {
    marginBottom: '-5vh',
  },
}));

const Boxes = ({ data, setIsHovered, onClose }: IProps) => {
  const classes = useStyles();
  // For branding Box 1 and Box2
  const brandingObj1 = {
    heading: '1.Market Research',
    subHeading: 'WHO?',
    imgOne: '/humanQuestionMark.jpg',
    imgTwo: '/whatImage.png',
  };
  const brandingObj2 = {
    heading: '2.User Research',
    subHeading: 'WHY? and HOW?',
    imgOne: '/whyImage.png',
    imgTwo: '/howImage.png',
  };
  // For Channels Box1 and Box2
  const channelsObj1 = {
    heading: '1.Market Research',
    subHeading: 'WHO?',
    imgOne: '/humanQuestionMark.jpg',
    imgTwo: '/whatImage.png',
  };
  const channelsObj2 = {
    heading: '2.User Research',
    subHeading: 'WHY? and HOW?',
    imgOne: '/whyImage.png',
    imgTwo: '/howImage.png',
  };

  // For Community Box1 and 2
  const communityObj1 = {
    heading: '1.Market Research',
    subHeading: 'WHO?',
    imgOne: '/humanQuestionMark.jpg',
    imgTwo: '/whatImage.png',
  };
  const communityObj2 = {
    heading: '2.User Research',
    subHeading: 'WHY? and HOW?',
    imgOne: '/whyImage.png',
    imgTwo: '/howImage.png',
  };
  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <Grid container justifyContent="flex-end">
        {' '}
        <Button
          className={classes.closeButton}
          variant="contained"
          color="primary"
          startIcon={<Close />}
          onClick={onClose}
        />
      </Grid>

      {data?.label === 'Branding' ? (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <InfoBox data={brandingObj1} boxNumber={1} />
          <InfoBox data={brandingObj2} boxNumber={2} />
        </div>
      ) : (
        ''
      )}
      {data?.label === 'Channels' ? (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <InfoBox data={channelsObj1} boxNumber={1} />
          <InfoBox data={channelsObj1} boxNumber={2} />
        </div>
      ) : (
        ''
      )}
      {data?.label === 'Community' ? (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <InfoBox data={communityObj2} boxNumber={1} />
          <InfoBox data={communityObj2} boxNumber={2} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
export default Boxes;
