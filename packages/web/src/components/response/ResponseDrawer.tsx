import { Typography } from '@mui/material';
import React, { useState } from 'react';
import Overlay from '../common/Overlay';
import { getLabel } from './SelectResponse';
import DisplayResponseById from './DisplayResponseById';

interface IProps {
  open: boolean;
  onClose: () => void;
  responseId: string;
}

export default function ResponseDrawer({ open, onClose, responseId }: IProps) {
  console.log('ResponseDrawer', open, onClose, responseId);
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

interface IProps2 {
  formField: string;
  response: any;
}

export const ShowResponseLabel = ({ formField, response }: IProps2) => {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <div>
      {showOverlay && (
        <ResponseDrawer
          data-testid="overlay"
          open={showOverlay}
          onClose={() => setShowOverlay(false)}
          responseId={response?._id}
        />
      )}

      <Typography
        data-testid="button"
        color="primary"
        onClick={() => setShowOverlay(true)}
        style={{ cursor: 'pointer' }}
      >
        {getLabel(formField, response)}
      </Typography>
    </div>
  );
};
