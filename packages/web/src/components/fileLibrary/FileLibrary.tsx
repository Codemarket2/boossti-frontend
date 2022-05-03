/* eslint-disable jsx-a11y/label-has-associated-control */
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DialogActions from '@mui/material/DialogActions';
import { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import { IconButton, useTheme } from '@mui/material';
import CheckBox from '@mui/icons-material/CheckBox';
import Delete from '@mui/icons-material/Delete';

interface FileLibraryProps {
  open: boolean;
  onClose: () => void;
  files: File[];
  onUpload: (selectedFiles: string[]) => void;
  onDelete: (ids: string[]) => void;
  onUploadNewFile: (newFiles: string[]) => void;
  title?: string;
}

interface File {
  id: string;
  url: string;
}

export default function FileLibrary({
  open,
  onClose,
  files,
  title = 'File Library',
  onUpload,
  onUploadNewFile,
  onDelete,
}: FileLibraryProps) {
  const ref: any = useRef();
  const [selectedTab, setSelectedTab] = useState(1);
  const theme = useTheme();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [tempFiles, setTempFiles] = useState([]);

  let disabled = false;
  if (selectedTab === 0) {
    disabled = disabled || tempFiles.length < 1;
  } else {
    disabled = disabled || selectedFiles.length < 1;
  }

  const handleUpload = () => {
    if (selectedTab === 0) {
      onClose();
    } else {
      onUpload(selectedFiles.map((file) => file.url));
    }
  };
  const handleDelete = () => {
    onDelete(selectedFiles.map((file) => file.id));
  };

  const handleAddFileChange = (event) => {
    if (event.target.files.length > 0) {
      const newFiles = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < event.target.files.length; i++) {
        const item = {
          url: URL.createObjectURL(event.target.files[i]),
          type: event.target.files[i].type,
        };
        newFiles.push(item);
      }
      setTempFiles([...tempFiles, ...newFiles]);
      ref.current.value = null;
    }
  };

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
            <label htmlFor="contained-button-file">
              <input
                style={{ display: 'none' }}
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                ref={ref}
                onChange={handleAddFileChange}
              />
              <Button variant="contained" component="span">
                Add File
              </Button>
            </label>
            <div className="d-flex mt-2">
              {tempFiles.map((file, i) => {
                return (
                  <div
                    id={i}
                    style={{
                      marginRight: 2,
                      width: '100px',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                      }}
                    >
                      <IconButton
                        onClick={() => setTempFiles(tempFiles.filter((f, index2) => index2 !== i))}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </div>
                    <img style={{ width: '100%' }} alt={file.url} src={file?.url} />
                  </div>
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
        <Button onClick={handleUpload} variant="contained" disabled={disabled}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}
