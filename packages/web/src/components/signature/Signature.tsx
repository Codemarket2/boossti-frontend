import { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
// eslint-disable-next-line import/no-duplicates
import SignaturePad from 'react-signature-canvas';
// eslint-disable-next-line import/no-duplicates
import SignatureCanvas from 'react-signature-canvas';

import useWindowSize from '@frontend/shared/hooks/web/useWindowSize';

interface Iprops {
  value?: string;
  onChange?: (value: string) => void;
}

const Signature = ({ value, onChange }: Iprops) => {
  const sigPadRef = useRef<SignatureCanvas>(null);

  const [dataURL, setDataURL] = useState<string | null>(null);
  const [canvasDimensions, setCanvasDimensions] = useState<{
    height: number;
    width: number;
  }>({ height: 200, width: 300 });

  const { height: windowHeight, width: windowWidth } = useWindowSize();

  useEffect(() => {
    if (windowWidth >= 768) {
      setCanvasDimensions({
        height: 200,
        width: 500,
      });
    }
  }, [windowWidth]);

  const handleSave = () => {
    const url = sigPadRef.current?.getTrimmedCanvas().toDataURL('image/png');
    // eslint-disable-next-line no-console
    // console.log(url);
    if (url) setDataURL(url);
    onChange(url);
  };
  const handleClear = () => {
    sigPadRef.current?.clear();
  };
  return (
    <div
      css={css`
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        width: 100%;
        background-color: #eceff1;
        @media (min-width: 768px) {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      `}
    >
      <p
        css={css`
          padding-left: 2rem;
          padding-right: 2rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
          @media (min-width: 768px) {
            margin-top: 0;
            margin-bottom: 0;
            font-size: 1.5rem;
            line-height: 2rem;
          }
        `}
      >
        Your Signature :
      </p>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <SignaturePad
          ref={sigPadRef}
          penColor="black"
          canvasProps={{
            width: canvasDimensions.width,
            height: canvasDimensions.height,
            className: 'sigCanvas',
            style: {
              backgroundColor: '#ffffff',
              borderRadius: '0.25rem',
              borderWidth: '2px',
              borderColor: '#3B82F6',
            },
          }}
        />
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            width: 66.666667%;
          `}
        >
          <div
            onClick={handleClear}
            css={css`
              padding-top: 0.25rem;
              padding-bottom: 0.25rem;
              padding-left: 1.25rem;
              padding-right: 1.25rem;
              margin-top: 0.5rem;
              margin-bottom: 0.5rem;
              background-color: #3b82f6;
              color: #ffffff;
              font-weight: 500;
              border-radius: 0.25rem;
              cursor: pointer;
            `}
          >
            Clear
          </div>
          <div
            onClick={handleSave}
            css={css`
              padding-top: 0.25rem;
              padding-bottom: 0.25rem;
              padding-left: 1.25rem;
              padding-right: 1.25rem;
              margin-top: 0.5rem;
              margin-bottom: 0.5rem;
              background-color: #3b82f6;
              color: #ffffff;
              font-weight: 500;
              border-radius: 0.25rem;
              cursor: pointer;
            `}
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signature;
