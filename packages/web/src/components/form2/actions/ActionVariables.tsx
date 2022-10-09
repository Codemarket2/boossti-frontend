import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import React from 'react';
import { SelectSubField } from '../field/field-condition/FieldConditionForm';
import InputGroup from '../../common/InputGroup';

interface IActionVariables {
  variables: any[];
  onVariablesChange: (newVariables: any[]) => void;
  disabled?: boolean;
  formId: string;
}

export default function ActionVariables({
  variables,
  onVariablesChange,
  disabled,
  formId,
}: IActionVariables) {
  return (
    <InputGroup>
      <Typography variant="h6" className="d-flex align-items-center pl-2">
        Variables
        <Tooltip title="Add New Variable">
          <IconButton
            color="primary"
            onClick={() => onVariablesChange([...variables, { name: '', field: '' }])}
            size="large"
          >
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </Typography>
      <InputLabel>
        Define Variables and use it in email subject and body. example - {`{{email}}`}
      </InputLabel>
      {variables.map((variable, variableIndex) => (
        <div className="d-flex align-items-top" key={variableIndex}>
          <TextField
            fullWidth
            className="mr-2 mt-2"
            label="Name"
            variant="outlined"
            name="name"
            size="small"
            disabled={disabled}
            value={variable.name}
            onChange={({ target }) =>
              onVariablesChange(
                variables.map((sV, sI) =>
                  sI === variableIndex ? { ...variable, name: target.value } : sV,
                ),
              )
            }
          />
          <SelectSubField
            onChange={(field) =>
              onVariablesChange(
                variables.map((sV, sI) => (sI === variableIndex ? { ...variable, field } : sV)),
              )
            }
            subField={{ ...variable.field, formId }}
          />
          <Tooltip title="Delete Variable">
            <IconButton
              color="primary"
              onClick={() => onVariablesChange(variables.filter((sV, sI) => sI !== variableIndex))}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ))}
    </InputGroup>
  );
}
