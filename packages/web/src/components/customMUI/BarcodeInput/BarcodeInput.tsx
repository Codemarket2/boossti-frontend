import React from 'react';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { InputAdornment, TextField } from '@mui/material';

const BarcodeInput = () => {
  return (
    <div>
      <TextField
        label={''}
        size="small"
        placeholder="Enter or Scan barcode"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
              />
              <label style={{ marginBottom: '0px' }} htmlFor="raised-button-file">
                <CameraAltOutlinedIcon />
              </label>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default BarcodeInput;
