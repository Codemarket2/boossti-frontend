import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Overlay from '../common/Overlay';
import { getLabel } from './SelectResponse';
import Response from './Response';

interface IProps {
  open: boolean;
  onClose: () => void;
  responseId: string;
}

export default function ResponseDrawer({ open, onClose, responseId }: IProps) {
  return (
    <Overlay open={open} onClose={onClose} title="Response">
      <div className="p-2">
        <Response responseId={responseId} hideBreadcrumbs />
      </div>
    </Overlay>
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
      <ResponseDrawer
        open={showOverlay}
        onClose={() => setShowOverlay(false)}
        responseId={response?._id}
      />
      <Typography
        color="primary"
        onClick={() => setShowOverlay(true)}
        style={{ cursor: 'pointer' }}
      >
        {getLabel(formField, response)}
      </Typography>
    </div>
  );
};
