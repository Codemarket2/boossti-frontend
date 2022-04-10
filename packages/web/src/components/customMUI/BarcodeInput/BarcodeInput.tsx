import React, { useEffect, useState } from 'react';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import dynamic from 'next/dynamic';
const BarcodeScannerComponent = dynamic(() => import('react-qr-barcode-scanner'), { ssr: false });

const BarcodeInput = ({ label, barcode, onBarcodeChange }) => {
  const [data, setData] = useState('Not Found');
  const [open, setOpen] = useState(false);
  const [stopStream, setStopStream] = useState(true);

  const handleOpen = () => {
    setOpen(true);
    setStopStream(false);
  };
  const handleClose = () => {
    setOpen(false);
    setStopStream(true);
  };
  const handleBarcodeChange = (value: string) => onBarcodeChange(value);

  useEffect(() => {
    if (data !== 'Not Found') {
      handleBarcodeChange(data);
      handleClose();
    }
  }, [data]);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  function openScanner() {
    return (
      <BarcodeScannerComponent
        width={300}
        height={300}
        stopStream={stopStream}
        onUpdate={(err, result: any) => {
          if (result) setData(result.text);
          else setData('Not Found');
        }}
      />
    );
  }

  return (
    <div>
      <TextField
        label={label}
        size="small"
        placeholder="Enter or Scan barcode"
        value={barcode ? barcode : ''}
        onChange={({ target }) => handleBarcodeChange(target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={handleOpen}>
              <label style={{ marginBottom: '0px' }} htmlFor="raised-button-file">
                <CameraAltOutlinedIcon />
              </label>
            </InputAdornment>
          ),
        }}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                SCANNING BARCODE:
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          <Box style={{ marginTop: '10px' }}>{typeof window !== 'undefined' && openScanner()}</Box>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>Code : {data}</p>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default BarcodeInput;
