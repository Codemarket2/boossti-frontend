/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { fileUpload } from '@frontend/shared/utils/fileUpload';
import { useSaveFileLibraryResponse } from '@frontend/shared/hooks/fileLibrary';
import Button from '@mui/material/Button';
import AttachFile from '@mui/icons-material/AttachFile';
import React, { useState } from 'react';
import { useGetResponses } from '@frontend/shared/hooks/response';
import FileLibrary from './FileLibrary';
import { onAlert } from '../../utils/alert';
import FileLibraryWrapper from './FileLibraryWrapper';

interface IProps {
  onUpload: (urls: string[]) => void;
  acceptedFileType?: any;
}

export default function FileUpload({ onUpload, acceptedFileType }: IProps) {
  const [state, setState] = useState({ showLibrary: false });

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
        <FileLibraryWrapper
          open={state.showLibrary}
          onClose={() => setState({ ...state, showLibrary: false })}
          onUpload={onUpload}
          onDelete={() => null}
          acceptedFileType={acceptedFileType}
        />
      )}
    </>
  );
}
