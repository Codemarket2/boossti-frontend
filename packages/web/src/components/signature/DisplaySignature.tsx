import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import SignatureCanvas from 'react-signature-canvas';

import useWindowSize from '@frontend/shared/hooks/web/useWindowSize';

import VisibilityIcon from '@mui/icons-material/Visibility';

export default function DisplaySignature({ value }: { value: string }) {
  const sigPadRef = useRef<SignatureCanvas>(null);

  const [imageMode, setImageMode] = useState<boolean>(false);

  const [dataURL, setDataURL] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    height: number;
    width: number;
  }>({ height: 200, width: 300 });

  const { height: windowHeight, width: windowWidth } = useWindowSize();

  useEffect(() => {
    if (windowWidth >= 768) {
      setImageDimensions({
        height: 200,
        width: 300,
      });
    }
  }, [windowWidth]);

  useEffect(() => {
    if (value !== dataURL) setDataURL(value);
    sigPadRef.current?.off();
    if (dataURL) sigPadRef.current?.fromDataURL(dataURL);
  }, [dataURL, value]);

  const SigImageWrapperDiv = styled.div`
    overflow: hidden;
    margin: 0.5rem;
    max-width: 20rem;
    border-radius: 0.5rem;
    border-width: 3px;
    border-style: solid;
    border-color: rgba(59, 130, 246, 0.2);
    padding: 0.5rem;
    &:hover {
      border-color: rgba(59, 130, 246, 1);
    }
    @media (min-width: 768px) {
      max-width: 36rem;
    }
  `;

  const DataURLPara = styled.p`
    font-size: 0.8rem;
    line-height: 1.75rem;
    font-weight: 400;
    display: flex;
    align-items: center;
  `;

  const iconStyles = css`
    font-size: 25px;
    margin-left: 0.5rem;
    transition: all 0.2s ease-in;
    cursor: pointer;
    &:hover {
      color: rgba(59, 130, 246, 1);
      transform: scale(1.1);
    }
  `;
  const iconStylesImage = css`
    font-size: 25px;
    margin-left: 0.5rem;
    transition: all 0.2s ease-in;
    cursor: pointer;
    &:hover {
      color: rgba(244, 63, 94, 0.5);
      transform: scale(1.1);
    }
  `;

  return (
    <>
      {dataURL ? (
        <>
          {imageMode ? (
            <SigImageWrapperDiv>
              <Image
                className="sigImage"
                style={{ border: '2px solid black' }}
                src={dataURL}
                alt="user generated signature"
                layout="fixed"
                width={imageDimensions.width}
                height={imageDimensions.height}
              />
              <VisibilityIcon css={iconStylesImage} onClick={() => setImageMode(false)} />
            </SigImageWrapperDiv>
          ) : (
            <>
              <DataURLPara>
                {dataURL.substr(0, 40)}...{' '}
                <VisibilityIcon
                  css={iconStyles}
                  //   sx={{ fontSize: 25 }}
                  onClick={() => setImageMode(true)}
                />
              </DataURLPara>
            </>
          )}
        </>
      ) : null}
    </>
  );
}
