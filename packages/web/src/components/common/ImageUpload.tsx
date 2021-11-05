import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Button, IconButton } from '@material-ui/core';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import { useCreateLogoOrDescription } from '@frontend/shared/hooks/logo';
import Loading from './LoadingBar';

interface IProps {
  name: string;
  uploadId: string;
}
export default function ImageUpload({ name, uploadId }: IProps) {
  const { handleSave, loading } = useCreateLogoOrDescription();

  const [file, setFile] = useState(null);
  const ref: any = useRef();
  const handleChange = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  useEffect(() => {
    <Loading />;
  }, [loading]);
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <input type="file" hidden onChange={handleChange} accept="image/*" id={uploadId} ref={ref} />
      <label htmlFor={uploadId}>
        <Button
          size="small"
          variant="outlined"
          component="span"
          color="primary"
          className="mb-2"
          startIcon={<PhotoLibraryIcon />}>
          {name}
        </Button>
      </label>
      {file && (
        <>
          <img
            src={file}
            width={100}
            height={100}
            style={{ alignSelf: 'center', marginBottom: 5 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 5 }}>
            <Button color="primary" variant="outlined" onClick={() => handleSave(file)}>
              {' '}
              save{' '}
            </Button>
            <Button color="secondary" variant="outlined" onClick={() => setFile(null)}>
              cancel
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
