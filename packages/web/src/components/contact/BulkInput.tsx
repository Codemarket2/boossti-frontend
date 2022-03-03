import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Button from '@material-ui/core/Button';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { fileUpload } from '@frontend/shared/utils/fileUpload';
import { useCreateMailingList } from '@frontend/shared/hooks/email/createMailingList';
import { useContactForm } from '@frontend/shared/hooks/contact';

const initialState = {
  showForm: false,
  fileUrl: null,
  fileData: [],
};

export default function BulkInput() {
  const [state, setState] = useState(initialState);
  const [files, setFiles] = useState([]);
  const [map, setMap] = useState({});
  const [selectedFile, setSelectedFile] = useState([]);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [cName, setCname] = useState('');
  const { formik, formLoading } = useContactForm();

  const { handleCreateList, createLoading } = useCreateMailingList();

  console.log(map);

  const resetStates = () => {
    setState(initialState);
    setFiles([]);
    setMap({});
    setSelectedFile([]);
    setIsFilePicked(false);
  };
  const changeHandler = (event) => {
    const { files } = event.target;
    files && handleFileUpload(event);
    let allFiles = [];
    for (let i = 0; i < files.length; i++) {
      allFiles.push(files[i]);
    }
    setSelectedFile(allFiles);
    setIsFilePicked(true);
  };

  // process CSV and xls data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
    setFiles(headers);
  };

  // handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws);
      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  const mapDataToField = () => {
    if (selectedFile) {
      setState({ ...state, fileData: files });
    } else setState(initialState);
  };

  const handleSubmit = async () => {
    try {
      const url = await fileUpload(selectedFile, '/csvDataFile');
      console.log(url);
      if (url) {
        setState({ ...state, fileUrl: url });

        const payload = {
          fileUrl: url[0],
          collectionName: cName,
          map: JSON.stringify(map),
        };

        console.log(payload);
        await handleCreateList(payload);
        setTimeout(() => {
          resetStates();
        }, 2500);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <Grid item lg={6}>
          <InputGroup>
            <TextField
              fullWidth
              label="Collection Name"
              variant="outlined"
              name="collection"
              size="small"
              type="text"
              placeholder="Type"
              value={cName}
              onChange={(event) => {
                setCname(event.target.value);
              }}
            />
          </InputGroup>
        </Grid>
        <form>
          <label htmlFor="upload">Upload File</label>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            name="upload"
            id="raised-button-file"
            onChange={changeHandler}
          />
        </form>
        {isFilePicked ? (
          selectedFile?.map((File, i) => (
            <div key={i} style={{ padding: '25px' }}>
              <h3>File {i + 1}</h3>
              <p>Filename: {File?.name}</p>
              <p>Filetype: {File?.type}</p>
              <p>Size in bytes: {File?.size}</p>
              {File?.lastModifiedDate && (
                <p>lastModifiedDate: {File?.lastModifiedDate.toLocaleDateString()}</p>
              )}
            </div>
          ))
        ) : (
          <p>Select a file to show details</p>
        )}

        {files?.length && (
          <form className="px-2 my-2">
            <InputGroup>
              <Typography variant="h6" className="d-flex align-items-center pl-2">
                Variables
              </Typography>

              {Object.keys(formik.values)?.map((field, i) => {
                if (field !== 'groupName') {
                  return (
                    <div className="d-flex align-items-center my-3" key={i}>
                      <TextField
                        fullWidth
                        className="mr-2"
                        label="Name"
                        variant="outlined"
                        name="name"
                        size="small"
                        value={field}
                      />
                      <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel id="variablefield-simple-select-outlined-label">
                          Field
                        </InputLabel>
                        <Select
                          labelId="variablefield-simple-select-outlined-label"
                          id="variablefield-simple-select-outlined"
                          name="value"
                          value={map[field]}
                          onChange={({ target }) => {
                            setMap({ ...map, [field]: target.value });
                          }}
                          label="Field"
                        >
                          {files?.map((keys, i) => (
                            <MenuItem key={i} value={keys}>
                              {keys}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  );
                }
              })}
            </InputGroup>
            <InputGroup>
              <LoadingButton
                loading={createLoading}
                onClick={handleSubmit}
                type="button"
                variant="contained"
                color="primary"
                fullWidth
              >
                Review And Submit
              </LoadingButton>
            </InputGroup>
          </form>
        )}
      </div>
    </>
  );
}
