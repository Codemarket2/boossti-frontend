import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import { Button, IconButton, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';
import InputGroup from '../common/InputGroup';

interface FieldFormulaProps {
  fields: any[];
  formula: any;
  onFormulaChange: (formula: any) => void;
}

export default function FieldFormula({ fields, formula, onFormulaChange }: FieldFormulaProps) {
  const onVariableChange = (variableIndex, variable) => {
    const newVariables = formula?.variables?.map((v, i) =>
      i === variableIndex ? { ...v, ...variable } : v,
    );
    onFormulaChange({ variables: newVariables });
  };
  const onVariableDelete = (variableIndex) => {
    const newVariables = formula?.variables?.filter((v, i) => i !== variableIndex);
    onFormulaChange({ variables: newVariables });
  };
  return (
    <div className="mb-3">
      <InputGroup>
        <FormControl fullWidth size="small">
          <InputLabel id="condition-select-label">Condition</InputLabel>
          <Select
            labelId="condition-select-label"
            value={formula?.condition}
            label="Condition"
            onChange={({ target: { value } }) =>
              onFormulaChange({ condition: value, variables: [{}] })
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="equalTo">is Equal to</MenuItem>
          </Select>
        </FormControl>
      </InputGroup>
      {formula?.variables?.map((variable, variableIndex) => (
        <div className="ml-2" key={variableIndex}>
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
                    <MenuItem value="">None</MenuItem>
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
                onChange={({ target: { value } }) => onVariableChange(variableIndex, { value })}
              >
                <MenuItem value="constantValue">Constant Value</MenuItem>
                <ListSubheader>Form fields</ListSubheader>
                {fields?.map((field) => (
                  <MenuItem value={field?._id}>{field?.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </InputGroup>
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
        </div>
      ))}
      {formula?.variables[formula?.variables.length - 1]?.value && (
        <Button
          size="small"
          startIcon={<Add />}
          onClick={() => onFormulaChange({ variables: [...formula.variables, {}] })}
        >
          Add operation
        </Button>
      )}
    </div>
  );
}
