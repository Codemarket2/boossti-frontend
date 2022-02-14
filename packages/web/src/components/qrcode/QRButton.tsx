import { Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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
          size={50}
          style={{ cursor: 'pointer' }}
          className="mx-2"
          onClick={() => setState(true)}
        />
      </Tooltip>
    </>
  );
};
