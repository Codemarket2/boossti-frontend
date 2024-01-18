import React from 'react';
import Button from '@mui/material/Button';

interface IProps {
  handleSelectRole: (role: string) => void;
}

export default function Step1({ handleSelectRole }: IProps) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div>
        <Button
          variant="contained"
          color="primary"
          className="mb-4"
          size="large"
          onClick={() => handleSelectRole('coach')}
        >
          Are you a coach?
        </Button>
        <br />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => handleSelectRole('client')}
        >
          Are you a client?
        </Button>
      </div>
    </div>
  );
}
