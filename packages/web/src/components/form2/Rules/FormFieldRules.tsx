import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { FormLabel, IconButton, OutlinedInput, Tooltip } from '@mui/material';
import InputGroup from '../../common/InputGroup';
import LoadingButton from '../../common/LoadingButton';

interface IProps {
  onCancel?: () => void;
  // onSave?: (payload: any, operation: string) => void;
  fields: any[];
}

const ruleListInitialState = [
  { id: 1, operation: '', field: '', customValue: '', addMore: false, next: false },
];

const FormFieldRules = ({ onCancel, fields }: IProps) => {
  const ruleConditionOptions = [{ label: 'is Equal to', value: 'isEqualTo' }];

  const ruleOperationOptions = [
    { value: '+', label: 'Add ( + )' },
    { value: '-', label: 'Minus ( - )' },
    { value: 'x', label: 'Multiply ( x )' },
    { value: '/', label: 'Divide ( / )' },
  ];
  const [condition, setCondition] = useState('');
  const [fieldSelected, setFieldSelected] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [operation, setOperation] = useState('');
  const [ruleList, setRuleList] = useState(ruleListInitialState);

  // useEffect(() => {
  //   console.table(ruleList);
  // }, [ruleList]);

  useEffect(() => {
    if (!ruleList.length) setRuleList(ruleListInitialState);
  }, [ruleList]);

  function createOperationList() {
    return (
      <>
        {(ruleList[0].field || ruleList[0].customValue) && (
          <InputGroup className="my-4 ml-5">
            <FormControl style={{ minWidth: 120 }} variant="outlined" size="small">
              <InputLabel id="condition-simple-select-outlined-label">Operation</InputLabel>
              <Select
                labelId="operation-simple-select-outlined-label"
                id="operation-simple-select-outlined"
                name="operation"
                value={operation}
                onChange={({ target }) => {
                  setOperation(target.value);
                  if (target.value) {
                    const newState = [...ruleList];
                    newState.push({
                      id: 0,
                      operation: '',
                      field: '',
                      customValue: '',
                      addMore: false,
                      next: false,
                    });
                    setRuleList(newState);
                  }
                }}
                label={` Operation `}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {ruleOperationOptions?.map((option, index) => (
                  <MenuItem key={index} value={option?.value}>
                    {option?.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </InputGroup>
        )}
      </>
    );
  }

  function fieldList(index: number) {
    return (
      <>
        <div className="d-flex align-items-center">
          <FormControl fullWidth variant="outlined" size="small" className="pl-2">
            {!(ruleList[index].field === 'custom') && (
              <InputLabel id="variablefield-simple-select-outlined-label">Field</InputLabel>
            )}
            <Select
              labelId="variablefield-simple-select-outlined-label"
              id="variablefield-simple-select-outlined"
              name="value"
              value={ruleList[index].field}
              onChange={({ target }) => {
                setFieldSelected(target.value);

                const newState = [...ruleList];
                newState[index].customValue = '';
                newState[index].field = target.value;
                newState[index].addMore = true;
                setRuleList(newState);
              }}
              label="Field"
            >
              {fields?.map((field) => (
                <MenuItem value={field._id}>{field.label}</MenuItem>
              ))}

              <MenuItem value="custom">
                <em>Custom Value</em>
              </MenuItem>
            </Select>
          </FormControl>

          {index > 0 && (
            <Tooltip title="Delete Rule item">
              <IconButton
                color="primary"
                onClick={() => {
                  setRuleList(ruleList.filter((item) => item.field && item.customValue !== ''));
                }}
                size="large"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>

        {fieldSelected === 'custom' && (
          <OutlinedInput
            className="ml-4"
            type="text"
            value={customValue}
            placeholder="Enter custom value"
            onChange={({ target }) => {
              setCustomValue(target.value);

              const newState = [...ruleList];
              newState[index].field = '';
              newState[index].customValue = target.value;
              setRuleList(newState);
            }}
          />
        )}

        {ruleList[index].addMore && ruleList[index].field && (
          <div className="flex">
            <FormLabel className="justify-center mt-2 ml-5">
              Add more
              <Tooltip title="Add more condition">
                <IconButton
                  color="primary"
                  onClick={() => {
                    createOperationList();

                    const newState = [...ruleList];
                    newState[index].next = true;
                    newState[index].addMore = false;
                    setRuleList(newState);
                  }}
                  size="large"
                >
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>
            </FormLabel>
          </div>
        )}
      </>
    );
  }

  return (
    <form className="px-2 mt-3">
      {ruleList.map((item, ruleIndex) => {
        const { id } = item;
        return (
          <div key={id}>
            {ruleIndex === 0 && (
              <InputGroup>
                <FormControl variant="outlined" fullWidth size="small">
                  <InputLabel id="condition-simple-select-outlined-label">Condition</InputLabel>
                  <Select
                    labelId="condition-simple-select-outlined-label"
                    id="condition-simple-select-outlined"
                    name="condition"
                    value={condition}
                    onChange={({ target }) => setCondition(target.value)}
                    label={` Condition `}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {ruleConditionOptions?.map((option, index) => (
                      <MenuItem key={index} value={option?.value}>
                        {option?.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </InputGroup>
            )}
            <InputGroup>{condition && fieldList(ruleIndex)}</InputGroup>

            {item.next && createOperationList()}
          </div>
        );
      })}

      <InputGroup className="mt-4">
        <LoadingButton
          type="submit"
          size="small"
          // loading={formik.isSubmitting}
        >
          Save
        </LoadingButton>
        <Button
          className="ml-2"
          variant="outlined"
          size="small"
          // disabled={formik.isSubmitting}
          onClick={() => {
            setRuleList(ruleListInitialState);
            onCancel();
          }}
        >
          Cancel
        </Button>
      </InputGroup>
    </form>
  );
};

export default FormFieldRules;
