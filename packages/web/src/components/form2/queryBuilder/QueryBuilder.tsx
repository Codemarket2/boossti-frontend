import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  Typography,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetForm } from '@frontend/shared/hooks/form';
import SelectForm from '../SelectForm';
import SelectFormFields from '../SelectFormFields';
import InputGroup from '../../common/InputGroup';
import Field from '../Field';

const operators = [
  { value: '==', label: 'Equals' },
  { value: '!=', label: 'Not Equals' },
  { value: '>', label: 'Greater Than' },
  { value: '<', label: 'Less Than' },
  { value: 'contains', label: 'Contains' },
];

const QueryBuilder = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const { data: getFormData } = useGetForm(selectedForm?._id);
  const [fields, setFields] = useState([]);
  const [conditions, setConditions] = useState([{ field: '', operator: '', value: null }]);

  useEffect(() => {
    if (selectedForm && getFormData?.getForm) {
      // Fetch fields for the selected form
      const formFields = getFormData?.getForm?.fields;
      setFields(formFields);
    }
  }, [getFormData?.getForm, selectedForm]);

  const handleFormChange = (newForm) => {
    setSelectedForm(newForm);
    setConditions([{ field: '', operator: '', value: '' }]);
  };

  const handleConditionChange = (index, key, value) => {
    const newConditions = [...conditions];
    newConditions[index][key] = value;
    setConditions(newConditions);
    updateQuery();
  };

  const addCondition = () => {
    setConditions([...conditions, { field: '', operator: '', value: '' }]);
  };

  const removeCondition = (index) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    setConditions(newConditions);
    updateQuery();
  };

  const updateQuery = () => {
    const valueFilter = conditions.reduce((acc, condition) => {
      if (condition.field && condition.operator && condition.value) {
        acc[condition.field] = { [condition.operator]: condition.value };
      }
      return acc;
    }, {});

    const query = {
      formId: selectedForm,
      valueFilter: Object.keys(valueFilter).length > 0 ? JSON.stringify(valueFilter) : undefined,
    };

    // onQueryChange(query);
  };

  useEffect(() => {
    updateQuery();
  }, [selectedForm, conditions]);

  return (
    <Box>
      <Typography fontWeight="bold" sx={{ marginTop: 4, marginBottom: 2 }}>
        Rule Builder
      </Typography>
      <SelectForm value={selectedForm} onChange={handleFormChange} />
      {selectedForm && (
        <>
          <Box sx={{ my: 2, ml: 4 }}>
            <Paper variant="outlined">
              {conditions.map((condition, index) => (
                <Box key={index} display="flex" alignItems="center" marginY={2}>
                  <InputGroup>
                    <SelectFormFields
                      formId={selectedForm?._id}
                      value={condition.field}
                      onChange={(fieldId) => handleConditionChange(index, 'field', fieldId)}
                    />
                  </InputGroup>
                  <FormControl size="small" style={{ minWidth: 120, marginRight: 10 }}>
                    <InputLabel>Operator</InputLabel>
                    <Select
                      value={condition.operator}
                      onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
                    >
                      {operators.map((op) => (
                        <MenuItem key={op.value} value={op.value}>
                          {op.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {condition.field ? (
                    <Field
                      field={{
                        ...fields?.find((f) => f?._id === condition.field),
                        label: 'Value',
                      }}
                      validate
                      value={condition.value || null}
                      onChangeValue={(value) => handleConditionChange(index, 'value', value)}
                    />
                  ) : (
                    <TextField
                      size="small"
                      label="Value"
                      value={condition.value?.value}
                      onChange={(e) =>
                        handleConditionChange(index, 'value', { value: e.target.value })
                      }
                      style={{ marginRight: 10 }}
                    />
                  )}
                  <IconButton onClick={() => removeCondition(index)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}

              <Button
                sx={{ mt: 0 }}
                size="small"
                startIcon={<AddIcon />}
                onClick={addCondition}
                variant="outlined"
              >
                Add Condition
              </Button>
            </Paper>
          </Box>
        </>
      )}
      <Box sx={{ marginTop: 2 }}>
        <Paper variant="outlined">
          <Typography fontWeight="bold" sx={{ my: 2 }}>
            Query Output
          </Typography>
          <FormControl size="small" fullWidth>
            <InputLabel>Select Response Field</InputLabel>
            <Select
              label="Select Response Field"
              //  value={age} onChange={}
            >
              <MenuItem value="getResponses">getResponses (Array)</MenuItem>
              <MenuItem value="count">count</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </Box>
      {/* <Typography variant="body2" color="textSecondary" style={{ marginTop: 20 }}>
        Query:{' '}
        {JSON.stringify(
          {
            formId: selectedForm,
            page,
            limit,
            search,
            formField,
            onlyMy,
            valueFilter: conditions.reduce((acc, condition) => {
              if (condition.field && condition.operator && condition.value) {
                acc[condition.field] = { [condition.operator]: condition.value };
              }
              return acc;
            }, {}),
          },
          null,
          2,
        )}
      </Typography> */}
    </Box>
  );
};

export default QueryBuilder;
