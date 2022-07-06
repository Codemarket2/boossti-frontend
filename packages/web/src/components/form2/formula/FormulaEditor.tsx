import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import { Button, FormHelperText, IconButton, TextField, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useState } from 'react';
import InputGroup from '../../common/InputGroup';
import DisplayFormula from './DisplayFormula';

interface FieldFormulaProps {
  fields: any[];
  formula: any;
  onSave: (formula: any) => void;
  onClose: () => void;
}

export default function FormulaEditor({
  fields,
  formula: tempFormula,
  onSave,
  onClose,
}: FieldFormulaProps) {
  const [formula, setFormula] = useState(tempFormula);
  const onFormulaChange = (newFormula) => {
    setFormula({ ...formula, ...newFormula });
  };
  return (
    <div>
      <DisplayFormula fields={fields} formula={formula} />
      <InputGroup>
        <FormControl fullWidth size="small" required>
          <InputLabel id="condition-select-label">Condition</InputLabel>
          <Select
            labelId="condition-select-label"
            value={formula?.condition}
            label="Condition"
            onChange={({ target: { value } }) =>
              onFormulaChange({ condition: value, variables: [{}] })
            }
            error={!formula?.condition}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="=">is Equal to</MenuItem>
          </Select>
          {!formula?.condition && <FormHelperText className="text-danger">Required</FormHelperText>}
        </FormControl>
      </InputGroup>
      {formula?.variables?.length > 0 && (
        <Variables
          level={1}
          fields={fields}
          variables={formula?.variables}
          onVariablesChange={(variables) => onFormulaChange({ variables })}
        />
      )}
      <InputGroup>
        <Button
          disabled={disableSaveButton(formula)}
          size="small"
          variant="contained"
          onClick={(e) => onSave(formula)}
        >
          Save Formula
        </Button>
        <Button
          disabled={!onClose}
          size="small"
          variant="outlined"
          className="ml-2"
          onClick={onClose}
        >
          Cancel
        </Button>
      </InputGroup>
      <Divider />
    </div>
  );
}

interface VariablesProps {
  variables: any[];
  onVariablesChange: (variables: any[]) => void;
  fields: any[];
  level?: number;
}

const Variables = ({ variables, onVariablesChange, fields, level }: VariablesProps) => {
  const onVariableChange = (variableIndex, variable) => {
    const newVariables = variables?.map((v, i) =>
      i === variableIndex ? { ...v, ...variable } : v,
    );
    onVariablesChange(newVariables);
  };

  const onVariableDelete = (variableIndex) => {
    const newVariables = variables?.filter((v, i) => i !== variableIndex);
    onVariablesChange(newVariables);
  };

  return (
    <div className={level === 1 ? '' : 'ml-4'} style={{ borderLeft: '1px dashed lightgrey' }}>
      <Typography fontWeight="bold">(</Typography>
      {variables?.map((variable, variableIndex) => (
        <div key={variableIndex}>
          {variableIndex > 0 && (
            <InputGroup>
              <div className="d-flex align-items-center">
                <FormControl fullWidth size="small">
                  <InputLabel id="operation-label">Operation</InputLabel>
                  <Select
                    labelId="operation-label"
                    value={variable?.operation}
                    label="Operation"
                    onChange={({ target: { value } }) =>
                      onVariableChange(variableIndex, { operation: value })
                    }
                  >
                    {/* <MenuItem value="">None</MenuItem> */}
                    <MenuItem value="add">+ Add</MenuItem>
                    <MenuItem value="subtract">- Subtract</MenuItem>
                    <MenuItem value="multiply">x Multiply</MenuItem>
                    <MenuItem value="divide">% Divide</MenuItem>
                  </Select>
                </FormControl>
                <div>
                  <IconButton
                    size="small"
                    edge="end"
                    color="error"
                    onClick={() => onVariableDelete(variableIndex)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
              </div>
            </InputGroup>
          )}
          <InputGroup>
            <FormControl fullWidth size="small">
              <InputLabel id="field-label">Value</InputLabel>
              <Select
                labelId="field-label"
                value={variable?.value}
                label="Value"
                onChange={({ target: { value } }) => {
                  const newVariable: any = { value };
                  if (value === 'brackets') {
                    newVariable.variables = [{}];
                  }
                  onVariableChange(variableIndex, newVariable);
                }}
                error={!variable?.value}
              >
                <MenuItem value="brackets">Open Brackets ( )</MenuItem>
                <MenuItem value="constantValue">Constant Value</MenuItem>
                <ListSubheader>Form fields</ListSubheader>
                {fields?.map((field) => (
                  <MenuItem value={field?._id}>{field?.label}</MenuItem>
                ))}
              </Select>
              {!variable?.value && (
                <FormHelperText className="text-danger">Required</FormHelperText>
              )}
            </FormControl>
          </InputGroup>
          {variable?.value === 'brackets' && (
            <>
              <Variables
                fields={fields}
                variables={variable?.variables}
                onVariablesChange={(childVariables) =>
                  onVariableChange(variableIndex, { variables: childVariables })
                }
              />
            </>
          )}
          {variable?.value === 'constantValue' && (
            <InputGroup>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Constant Value"
                value={variable.constantValue}
                onChange={({ target: { value } }) =>
                  onVariableChange(variableIndex, { constantValue: value })
                }
              />
            </InputGroup>
          )}
          {variables.length - 1 === variableIndex &&
            showAddOperation(variables[variables.length - 1]) && (
              <Button
                className="ml-n1"
                size="small"
                startIcon={<Add />}
                onClick={() => onVariablesChange([...variables, {}])}
              >
                Add operation
              </Button>
            )}
        </div>
      ))}
      <Typography fontWeight="bold">)</Typography>
    </div>
  );
};

const showAddOperation = (variable) => {
  let show = false;
  const value = variable?.value;
  if (value === 'constantValue' && variable?.constantValue) {
    show = true;
  } else if (value) {
    show = true;
  }
  return show;
};

const disableSaveButton = (formula) => {
  let disabled = false;
  if (!formula?.condition) {
    disabled = true;
  } else if (validateVariables(formula?.variables)) {
    disabled = true;
  }
  return disabled;
};

const validateVariables = (variables) => {
  let disabled = false;
  variables?.forEach((variable, variableIndex) => {
    if (variableIndex !== 0 && !variable?.operation) {
      disabled = true;
    } else if (!variable?.value) {
      disabled = true;
    } else if (variable?.value === 'constantValue' && !variable?.constantValue) {
      disabled = true;
    } else if (variable?.value === 'brackets' && validateVariables(variable?.variables)) {
      disabled = true;
    }
  });
  return disabled;
};
