import { useCreateBulkResponse } from '@frontend/shared/hooks/response';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';
import BulkUploadForm from './BulkUploadForm';
import { fileUpload } from '../../../../shared/utils/fileUpload';

interface IProps {
  form: any;
}

const initialState = {
  showForm: false,
  fileUrl: null,
  fileData: [],
};

export default function BulkUploadAction({ form }: IProps) {
  const [state, setState] = useState(initialState);
  const [files, setFiles] = useState([]);
  const [map, setMap] = useState({});

  const [selectedFile, setSelectedFile] = useState([]);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const { createBulkResponseHandler, createLoading } = useCreateBulkResponse();

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

      if (url) {
        setState({ ...state, fileUrl: url });

        const payload = {
          fileUrl: url[0],
          map: JSON.stringify(map),
          formId: form._id,
          parentId: form.parentId ? form.parentId : null,
        };
        await createBulkResponseHandler(payload);
        setTimeout(() => {
          resetStates();
        }, 500);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Typography variant="h5" className="d-flex align-items-center pl-2">
        File Upload ( .xlsx, .csv, .xls)
        {!state.showForm && (
          <Tooltip title="Add File Upload Action">
            <IconButton
              color="primary"
              onClick={() => setState({ ...state, showForm: true })}
              size="large"
            >
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        )}
      </Typography>
      {state.showForm && (
        <div style={{ margin: '35px', padding: '15px' }}>
          <input
            accept=".csv,.xlsx,.xls"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            name="file"
            onChange={changeHandler}
          />
          <label htmlFor="raised-button-file">
            <Button variant="outlined" component="span">
              Select File
            </Button>
          </label>
          {isFilePicked ? (
            selectedFile?.map((File, i) => (
              <div key={i} style={{ padding: '25px' }}>
                <h3>File {i + 1}</h3>
                <p>Filename: {File?.name}</p>
                <p>Filetype: {File?.type}</p>
                <p>Size in bytes: {File?.size}</p>
                <p>lastModifiedDate: {File?.lastModifiedDate.toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>Select a file to show details</p>
          )}
          {isFilePicked && selectedFile && (
            <Button variant="contained" color="primary" component="span" onClick={mapDataToField}>
              {selectedFile.length > 1 ? 'Upload Files' : 'Map Fields'}
            </Button>
          )}
        </div>
      )}
      {state?.fileData?.length > 0 && (
        <BulkUploadForm
          fields={form?.fields}
          fileData={state.fileData}
          handleSubmit={handleSubmit}
          map={map}
          setMap={setMap}
          createLoading={createLoading}
        />
      )}
    </>
  );
}
