/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { fileUpload } from '@frontend/shared/utils/fileUpload';
import { useSaveFileLibraryResponse } from '@frontend/shared/hooks/fileLibrary';

import React, { useEffect, useState } from 'react';
import { useGetResponses } from '@frontend/shared/hooks/response';
import FileLibrary from './FileLibrary';
import { onAlert } from '../../utils/alert';
import { getFormBySlug } from '../../../../shared/hooks/form/getForm';

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
  const [form, setform] = useState(null);
  const [fieldId, setfieldId] = useState(null);
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
  useEffect(() => {
    const getForm = async () => {
      const tempForm = await getFormBySlug('file-library');
      setform(tempForm);

      await tempForm?.fields?.forEach((field) => {
        if (field?.label === 'type') {
          setfieldId(field?._id);
        }
      });
    };
    getForm();
    setState({ ...state, limit: 5 });
  }, []);

  // Code below is for the file library
  // All user can see each other files
  const { data, loading, state, setState } = useGetResponses({
    formId: form?._id, // || '631cfdd2bb5421884a6bbe2e',
    onlyMy: false,
    workFlowFormResponseParentId: null,
    appId: null,
    instanceId: null,
    valueFilter: {
      'values.field': fieldId, // || '631cfdf50eaa703a059e432c', //'631cfdf50eaa703a059e432c',
      'values.value': { $regex: 'image/', $options: 'i' },
    },
  });

  let fileLibraryData = [];

  if (data && loading === false) {
    fileLibraryData = data?.getResponses?.data?.map((item) => {
      return {
        id: item?._id,
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
        loading={loading}
        search={state.search}
        onSearchChange={(search) => setState({ ...state, search })}
        onUploadNewFile={onUploadNewFile}
        acceptedFileType={acceptedFileType}
        count={data?.getResponses?.count || 0}
        rowsPerPage={state.limit}
        page={state.page - 1}
        onPageChange={(e, newPage) => setState({ ...state, page: newPage + 1 })}
        onRowsPerPageChange={(e) => setState({ ...state, limit: Number(e.target.value) })}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );
}
