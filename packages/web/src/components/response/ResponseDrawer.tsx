import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import Overlay from '../common/Overlay';
import { getLabel } from './SelectResponse';
import DisplayResponseById from './DisplayResponseById';
import DisplayResponseValueWrapper from './DisplayResponseValue';

interface IProps {
  open: boolean;
  onClose: () => void;
  responseId: string;
}

export default function ResponseDrawer({ open, onClose, responseId }: IProps) {
  return (
    <div data-testid="overlay">
      <Overlay open={open} onClose={onClose} title="Response">
        <div className="p-2">
          <DisplayResponseById responseId={responseId} hideBreadcrumbs />
        </div>
      </Overlay>
    </div>
  );
}

interface IShowResponseLabel {
  formField: string;
  response: any;
  formId: string;
  onClickResponse?: () => void;
}

export const ShowResponseLabel = ({
  formField,
  response,
  formId,
  onClickResponse,
}: IShowResponseLabel) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const label = getLabel(formField, response);

  return (
    <div>
      {label || (response && !response?._id && typeof response === 'string') ? (
        <>
          <Typography
            data-testid="button"
            color="primary"
            onClick={() => {
              if (onClickResponse) {
                onClickResponse();
              } else {
                setShowOverlay(true);
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            {label || (
              <DisplayResponseValueWrapper
                formId={formId}
                responseId={response}
                fieldId={formField}
                onClickResponse={() => setShowOverlay(true)}
              />
            )}
          </Typography>
        </>
      ) : (
        <>
          {response?._id && (
            <DisplayResponseValueWrapper
              onClickResponse={() => setShowOverlay(true)}
              formId={formId}
              responseId={response?._id}
              fieldId={formField}
            />
          )}
        </>
      )}
      {showOverlay && (
        <ResponseDrawer
          data-testid="overlay"
          open={showOverlay}
          onClose={() => setShowOverlay(false)}
          responseId={response?._id || (typeof response === 'string' && response)}
        />
      )}
    </div>
  );
};
