import { fileUpload } from '@frontend/shared/utils/fileUpload';
import Button from '@mui/material/Button';
import AttachFile from '@mui/icons-material/AttachFile';
import React, { useState } from 'react';
import FileLibrary from './FileLibrary';

interface IProps {
  onUpload: (urls: string[]) => void;
  acceptedFileType?: any;
}

export default function FileUpload({ onUpload, acceptedFileType }: IProps) {
  const [state, setState] = useState({ showLibrary: false });

  const onUploadNewFile = async (files) => {
    const fileUrls = await fileUpload(
      files?.map((f) => f.file),
      '/form-files',
    );
    onUpload(fileUrls);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AttachFile />}
        onClick={() => setState({ ...state, showLibrary: true })}
      >
        Upload File
      </Button>
      {state.showLibrary && (
        <FileLibrary
          open={state.showLibrary}
          onClose={() => setState({ ...state, showLibrary: false })}
          files={[]}
          onUpload={() => null}
          onDelete={() => null}
          onUploadNewFile={onUploadNewFile}
          acceptedFileType={acceptedFileType}
        />
      )}
    </>
  );
}
