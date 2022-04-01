import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputGroup from '../common/InputGroup';

const defaultVariable = { name: '', field: null };

export default function DesignVariables({
  fields = [],
  variables = [],
  onVariableChange,
  onClickBack,
  hideBackButton = false,
}) {
  return (
    <Paper variant="outlined" className="px-2">
      <Typography variant="h5" className="d-flex align-items-center">
        {!hideBackButton && (
          <Tooltip title="Back">
            <IconButton edge="start" color="primary" onClick={onClickBack} size="large">
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        )}
        Variables
        <Tooltip title="Add New Action">
          <IconButton
            edge="end"
            color="primary"
            onClick={() => onVariableChange([...variables, defaultVariable])}
            size="large"
          >
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </Typography>
      <InputLabel>Define variables and use it in design layout. example - {`{{email}}`}</InputLabel>
      <InputGroup>
        {variables?.map((variable, i) => (
          <div className="d-flex align-items-center" key={i}>
            <TextField
              fullWidth
              className="mr-2"
              label="Name"
              variant="outlined"
              name="name"
              size="small"
              value={variable.name}
              onChange={({ target }) =>
                onVariableChange(
                  variables.map((sV, sI) => (sI === i ? { ...variable, name: target.value } : sV)),
                )
              }
            />
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="variablefield-simple-select-outlined-label">Field</InputLabel>
              <Select
                labelId="variablefield-simple-select-outlined-label"
                id="variablefield-simple-select-outlined"
                name="value"
                value={variable.field}
                onChange={({ target }) =>
                  onVariableChange(
                    variables.map((sV, sI) =>
                      sI === i ? { ...variable, field: target.value } : sV,
                    ),
                  )
                }
                label="Field"
              >
                {fields?.map((field, i) => (
                  <MenuItem value={field._id} key={i}>
                    {field.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Tooltip title="Delete Variable">
              <IconButton
                edge="end"
                color="primary"
                onClick={() => {
                  onVariableChange(variables.filter((sV, sI) => sI !== i));
                }}
                size="large"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        ))}
      </InputGroup>
    </Paper>
  );
}
