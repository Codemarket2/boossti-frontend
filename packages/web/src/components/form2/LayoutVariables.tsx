import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InputGroup from '../common/InputGroup';

const defaultVariable = { name: '', field: null };

export default function Layout({
  fields = [],
  variables = [],
  onVariableChange,
  onClickBack,
}: any) {
  return (
    <Paper variant="outlined" className="px-2">
      <Typography variant="h5" className="d-flex align-items-center">
        <Tooltip title="Back">
          <IconButton edge="start" color="primary" onClick={onClickBack}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        Variables
        <Tooltip title="Add New Action">
          <IconButton
            edge="end"
            color="primary"
            onClick={() => onVariableChange([...variables, defaultVariable])}
          >
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </Typography>
      <InputLabel>Define variables and use it in design layout. example - {`{{email}}`}</InputLabel>{' '}
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
                {fields?.map((field) => (
                  <MenuItem value={field._id}>{field.label}</MenuItem>
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
