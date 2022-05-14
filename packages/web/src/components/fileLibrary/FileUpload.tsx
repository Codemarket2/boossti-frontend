/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { fileUpload } from '@frontend/shared/utils/fileUpload';
import { useSaveFileLibraryResponse } from '@frontend/shared/hooks/fileLibrary';
import Button from '@mui/material/Button';
import AttachFile from '@mui/icons-material/AttachFile';
import React, { useState } from 'react';
import FileLibrary from './FileLibrary';
import { onAlert } from '../../utils/alert';

interface IProps {
  onUpload: (urls: string[]) => void;
  acceptedFileType?: any;
}

export default function FileUpload({ onUpload, acceptedFileType }: IProps) {
  const [state, setState] = useState({ showLibrary: false });
  const { handleSaveFileLibraryResponse } = useSaveFileLibraryResponse({ onAlert });

  const onUploadNewFile = async (files) => {
    const fileUrls = await fileUpload(
      files?.map((f) => f.file),
      '/form-files',
    );
    const urlsUploaded = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const response = await handleSaveFileLibraryResponse({
        url: fileUrls[i],
        type: file.type,
        size: file.size,
        alt: '',
      });
      if (response?._id) {
        urlsUploaded?.push(fileUrls[i]);
      }
    }
    onUpload(urlsUploaded);
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
