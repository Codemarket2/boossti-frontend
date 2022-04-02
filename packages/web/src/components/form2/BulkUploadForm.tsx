import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';

interface IProps {
  fields: any[];
  fileData: any[];
  handleSubmit: any;
  map: any;
  setMap: any;
  createLoading: boolean;
}

export default function BulkUploadForm({
  fields,
  fileData,
  handleSubmit,
  map,
  setMap,
  createLoading,
}: IProps) {
  const options = fileData;

  return (
    <form className="px-2 my-2">
      <InputGroup>
        <Typography variant="h6" className="d-flex align-items-center pl-2">
          Variables
        </Typography>

        {fields.map((field, i) => (
          <div className="d-flex align-items-center my-3" key={i}>
            <TextField
              fullWidth
              className="mr-2"
              label="Name"
              variant="outlined"
              name="name"
              size="small"
              value={field.label}
            />
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="variablefield-simple-select-outlined-label">Field</InputLabel>
              <Select
                labelId="variablefield-simple-select-outlined-label"
                id="variablefield-simple-select-outlined"
                name="value"
                value={map[field.lable]}
                onChange={({ target }) => {
                  setMap({ ...map, [field._id]: target.value });
                }}
                label="Field"
              >
                {options?.map((keys, i2) => (
                  <MenuItem key={i2} value={keys}>
                    {keys}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ))}
      </InputGroup>
      {/* <Button variant="contained" color="primary" component="span" onClick={handleSubmit}>
        {!createLoading ? `Review And Submit` : ''}
      </Button> */}
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
  );
}
