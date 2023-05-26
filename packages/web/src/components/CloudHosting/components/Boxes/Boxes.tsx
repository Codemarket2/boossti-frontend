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
  const [dataObj1, setDataObj1] = useState<IObj>(brandingObj1);
  const [dataObj2, setDataObj2] = useState(brandingObj2);

  useEffect(() => {
    if (data.label === 'Branding') {
      setDataObj1(brandingObj1);

      setDataObj2(brandingObj2);
    } else if (data.label === 'Channels') {
      setDataObj1(brandingObj1);
      setDataObj2(brandingObj1);
    } else {
      setDataObj1(brandingObj2);
      setDataObj2(brandingObj2);
    }
  }, [data]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <InfoBox data={dataObj1} boxNumber={1} />
      <InfoBox data={dataObj2} boxNumber={2} />
    </div>
  );
};
export default Boxes;
