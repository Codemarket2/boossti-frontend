/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import { useState, useRef, useMemo } from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import { IconButton, useTheme } from '@mui/material';
import CheckBox from '@mui/icons-material/CheckBox';
import Delete from '@mui/icons-material/Delete';
import { useDropzone } from 'react-dropzone';

interface FileLibraryProps {
  open: boolean;
  onClose: () => void;
  files: File[];
  onUpload: (selectedFiles: string[]) => void;
  onDelete: (ids: string[]) => void;
  onUploadNewFile: (newFiles: any) => void;
  title?: string;
  acceptedFileType?: any;
}

interface File {
  id: string;
  url: string;
}

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

export default function FileLibrary({
  open,
  onClose,
  files,
  title = 'File Library',
  onUpload,
  onUploadNewFile,
  onDelete,
  acceptedFileType,
}: FileLibraryProps) {
  const ref: any = useRef();
  const [selectedTab, setSelectedTab] = useState(0);
  const [uploadingLoading, setUploadingLoading] = useState(false);

  const theme = useTheme();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [tempFiles, setTempFiles] = useState([]);

  const onDrop = (newDropFiles) => {
    if (newDropFiles.length > 0) {
      const newFiles = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < newDropFiles.length; i++) {
        const item = {
          file: newDropFiles[i],
          url: URL.createObjectURL(newDropFiles[i]),
          type: newDropFiles[i].type,
          name: newDropFiles[i]?.name,
          size: newDropFiles[i]?.size,
        };
        newFiles.push(item);
      }
      setTempFiles([...tempFiles, ...newFiles]);
      ref.current.value = null;
    }
  };

  let dropzoneProps = {};
  if (acceptedFileType) {
    dropzoneProps = { ...dropzoneProps, accept: acceptedFileType };
  }
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    ...dropzoneProps,
    onDrop,
    disabled: uploadingLoading,
  });

  let disabled = false;
  if (selectedTab === 0) {
    disabled = disabled || tempFiles.length < 1;
  } else {
    disabled = disabled || selectedFiles.length < 1;
  }

  const handleUpload = async () => {
    try {
      setUploadingLoading(true);
      if (selectedTab === 0) {
        await onUploadNewFile(tempFiles);
      } else {
        onUpload(selectedFiles.map((file) => file.url));
      }
      setUploadingLoading(false);
    } catch (error) {
      setUploadingLoading(false);
      alert(`Error while uploading file, ${error.message}`);
    }
  };
  const handleDelete = () => {
    onDelete(selectedFiles.map((file) => file.id));
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  return (
    <Dialog fullWidth onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
        <Tab label="Upload" />
        <Tab label="Library" />
      </Tabs>
      <DialogContent dividers>
        {selectedTab === 0 ? (
          <>
            <div className="container">
              {/* @ts-ignore */}
              <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag and drop some files here, or click to select files</p>
              </div>
            </div>
            <div>
              {tempFiles.map((file, i) => {
                return (
                  <Card
                    variant="outlined"
                    key={i}
                    className="d-flex justify-content-between align-items-center p-2 mt-2"
                  >
                    {file.type.includes('image') && (
                      <div
                        style={{
                          width: '100px',
                        }}
                      >
                        <img style={{ width: '100%' }} alt={file.url} src={file?.url} />
                      </div>
                    )}
                    <div className="d-flex justify-content-between align-items-center w-100 pl-2">
                      <div>
                        {file.name} - {formatBytes(file.size)}
                      </div>
                      <IconButton
                        onClick={() => setTempFiles(tempFiles.filter((f, index2) => index2 !== i))}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          <div className="d-flex">
            {files.map((file) => {
              const isFileSelected = selectedFiles.some((f) => f?.id === file?.id);
              return (
                <div
                  id={file.id}
                  style={{
                    marginRight: 2,
                    padding: 1,
                    border: `2px solid ${
                      isFileSelected ? theme.palette.primary.main : theme.palette.background.default
                    }`,
                    cursor: 'pointer',
                    width: '100px',
                  }}
                  onClick={() => {
                    let newSelectedFiles = [...selectedFiles];
                    if (isFileSelected) {
                      newSelectedFiles = selectedFiles?.filter((m) => m?.id !== file?.id);
                    } else {
                      newSelectedFiles = [...selectedFiles, file];
                    }
                    setSelectedFiles(newSelectedFiles);
                  }}
                >
                  {isFileSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                      }}
                    >
                      <CheckBox color="primary" />
                    </div>
                  )}
                  <img style={{ width: '100%' }} alt={file.id} src={file?.url} />
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {selectedTab === 1 && (
          <Button onClick={handleDelete} color="error" variant="contained" disabled={disabled}>
            Delete
          </Button>
        )}
        <LoadingButton
          loading={uploadingLoading}
          onClick={handleUpload}
          variant="contained"
          disabled={disabled}
        >
          Upload
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // eslint-disable-next-line no-restricted-properties
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
