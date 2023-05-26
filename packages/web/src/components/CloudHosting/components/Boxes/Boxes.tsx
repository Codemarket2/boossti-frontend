import React, { useEffect, useRef, useState } from 'react';
import InfoBox from './InfoBox';

interface IData {
  label: string;
  value: number;
}
interface IProps {
  data: IData;
}
interface IObj {
  heading: string;
  subHeading?: string;
  imgOne: string;
  imgTwo: string;
}
const Boxes = ({ data }: IProps) => {
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
    <>
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
          <InfoBox data={channelsObj2} boxNumber={2} />
        </div>
      ) : (
        ''
      )}
      {data?.label === 'Community' ? (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <InfoBox data={communityObj1} boxNumber={1} />
          <InfoBox data={communityObj2} boxNumber={2} />
        </div>
      ) : (
        ''
      )}
    </>
  );
};
export default Boxes;
