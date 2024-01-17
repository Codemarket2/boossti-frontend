import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import SignatureCanvas from 'react-signature-canvas';

export default function DisplaySignature({ value }: { value: string }) {
  const sigPadRef = useRef<SignatureCanvas>(null);

  const [dataURL, setDataURL] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    height: number;
    width: number;
  }>({ height: 50, width: 125 });

  useEffect(() => {
    if (value && value !== dataURL) setDataURL(value);
    sigPadRef.current?.off();
    if (dataURL) sigPadRef.current?.fromDataURL(dataURL);
  }, [dataURL, value]);

  const SigImageWrapperDiv = styled.div`
    overflow: hidden;
    margin: 0.5rem;
    max-width: 20rem;
    border-radius: 0.25rem;
    border-width: 1.89px;
    border-style: solid;
    border-color: rgba(59, 130, 246, 0);
    background-color: #fff;
    padding: 0.5rem;
    &:hover {
      border-color: rgba(59, 130, 246, 1);
    }
    @media (min-width: 768px) {
      max-width: 36rem;
    }
  `;

  const imageStyles = css``;

  return (
    <>
      {dataURL ? (
        <>
          <SigImageWrapperDiv>
            <Image
              className="sigImage"
              style={{ border: '2px solid black' }}
              src={dataURL}
              css={imageStyles}
              alt="user generated signature"
              layout="fixed"
              width={imageDimensions.width}
              height={imageDimensions.height}
            />
          </SigImageWrapperDiv>
        </>
      ) : null}
    </>
  );
}
