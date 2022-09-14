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

interface FileLibraryWrapperProps {
  open: boolean;
  onClose: () => void;

  onUpload: (selectedFiles: string[]) => void;
  onDelete: (ids: string[]) => void;
  acceptedFileType?: any;
}

export default function FileLibraryWrapper({
  open,
  onClose,
  onDelete,

  onUpload,
  acceptedFileType,
}: FileLibraryWrapperProps) {
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
  // Code below is for the file library
  // All user can whatch each other files
  const { data, loading } = useGetResponses({
    formId: '631cfdd2bb5421884a6bbe2e', // form id of file-library form
    onlyMy: false,
    workFlowFormResponseParentId: null,
    appId: null,
    installId: null,
    valueFilter: null,
  });

  let fileLibraryData = [];
  if (data && loading === false) {
    fileLibraryData = data?.getResponses?.data?.map((item) => {
      return {
        id: item._id,
        url: item?.values[0]?.value,
      };
    });
  }
  return (
    <>
      <FileLibrary
        open={open}
        onClose={onClose}
        files={fileLibraryData}
        onUpload={(urls: string[]) => {
          onUpload(urls);
        }}
        onDelete={onDelete}
        onUploadNewFile={onUploadNewFile}
        acceptedFileType={acceptedFileType}
      />
    </>
  );
}
