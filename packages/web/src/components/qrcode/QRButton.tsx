import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
const QRCode = require('qrcode.react');

export const QRButton = () => {
  const [state, setState] = useState(false);
  const value = window?.location?.href;
  return (
    <>
      {state && (
        <Dialog open={state} onClick={() => setState(false)}>
          <DialogTitle className="text-center">QR Code with page link</DialogTitle>
          <DialogContent>
            <QRCode value={value} size={250} />
          </DialogContent>
          <DialogActions className="justify-content-center">
            <Button onClick={() => setState(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Tooltip title="Page QR Code">
        <QRCode
          value={value}
          size={40}
          style={{ cursor: 'pointer' }}
          className="mx-2"
          onClick={() => setState(true)}
        />
      </Tooltip>
    </>
  );
};
