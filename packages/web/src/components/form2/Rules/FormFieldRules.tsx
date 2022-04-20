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
  onOptionChange: (newValue: any) => void;
  fields: any[];
  data: any;
}

const ruleListInitialState = [
  { operation: '', field: '', customValue: '', addMore: false, next: false },
];

const FormFieldRules = ({ onCancel, onOptionChange, fields, data }: IProps) => {
  const ruleConditionOptions = [{ label: 'is Equal to', value: 'isEqualTo' }];

  const ruleOperationOptions = [
    { value: '+', label: 'Add ( + )' },
    { value: '-', label: 'Minus ( - )' },
    { value: 'x', label: 'Multiply ( x )' },
    { value: '/', label: 'Divide ( / )' },
  ];
  const [condition, setCondition] = useState(data ? data?.condition : '');
  const [ruleList, setRuleList] = useState(data ? data?.ruleList : ruleListInitialState);
  const [dataChange, setDataChange] = useState(false);

  useEffect(() => {
    if (!ruleList.length) setRuleList(ruleListInitialState);
  }, [ruleList]);

  useEffect(() => {
    // console.log('datachange:', dataChange);
    if (data?.condition === condition && data?.condition === ruleList) setDataChange(false);
    else setDataChange(true);
  }, [data, condition, ruleList]);

  function createOperationList(ruleIndex: number) {
    return (
      <>
        {condition && (ruleList[0].field || ruleList[0].customValue) && (
          <InputGroup className="my-4 ml-5">
            <FormControl style={{ minWidth: 120 }} variant="outlined" size="small">
              <InputLabel id="condition-simple-select-outlined-label">Operation</InputLabel>
              <Select
                labelId="operation-simple-select-outlined-label"
                id="operation-simple-select-outlined"
                name="operation"
                value={ruleList[ruleIndex].operation}
                onChange={({ target }) => {
                  const temp = [...ruleList];
                  temp[ruleIndex].operation = target.value;
                  setRuleList(temp);

                  if (ruleList[ruleList.length - 1].field !== '' && target.value) {
                    const newState = [...ruleList];
                    newState.push({
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

  function fieldList(ruleIndex: number) {
    return (
      <>
        <div className="d-flex align-items-center">
          <FormControl fullWidth variant="outlined" size="small" className="pl-2">
            {!(ruleList[ruleIndex].field === 'custom') && (
              <InputLabel id="variablefield-simple-select-outlined-label">Field</InputLabel>
            )}
            <Select
              labelId="variablefield-simple-select-outlined-label"
              id="variablefield-simple-select-outlined"
              name="value"
              value={ruleList[ruleIndex].field}
              onChange={({ target }) => {
                const newState = [...ruleList];
                newState[ruleIndex].customValue = '';
                newState[ruleIndex].field = target.value;
                if (ruleList[ruleIndex + 1]) newState[ruleIndex].addMore = false;
                else newState[ruleIndex].addMore = true;
                setRuleList(newState);
              }}
              label="Field"
            >
              {fields?.map((field, i) => (
                <MenuItem key={i} value={field._id}>
                  {field.label}
                </MenuItem>
              ))}

              <MenuItem value="custom">
                <em>Custom Value</em>
              </MenuItem>
            </Select>
          </FormControl>

          {ruleIndex > 0 && (
            <Tooltip title="Delete Rule item">
              <IconButton
                color="primary"
                onClick={() => {
                  setRuleList(
                    ruleList.filter((item) => item.field !== '' && item.customValue !== ''),
                  );
                  const newState = [...ruleList];
                  newState[ruleIndex - 1].addMore = true;
                  newState[ruleIndex - 1].next = false;
                  newState.length = ruleIndex;
                  setRuleList(newState);
                }}
                size="large"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>

        {ruleList[ruleIndex].field === 'custom' && (
          <OutlinedInput
            className="ml-4"
            type="text"
            value={ruleList[ruleIndex].customValue}
            placeholder="Enter custom value"
            onChange={({ target }) => {
              const newState = [...ruleList];
              newState[ruleIndex].customValue = target.value;
              setRuleList(newState);
            }}
          />
        )}

        {ruleList[ruleIndex].addMore && ruleList[ruleIndex].field && (
          <div className="flex">
            <FormLabel className="justify-center mt-2 ml-5">
              Add more
              <Tooltip title="Add more condition">
                <IconButton
                  color="primary"
                  onClick={() => {
                    createOperationList(ruleIndex);

                    const newState = [...ruleList];
                    newState[ruleIndex].next = true;
                    newState[ruleIndex].addMore = false;
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

  const submitHandler = (event) => {
    event.preventDefault();

    const rulesData = {
      condition,
      ruleList,
    };

    onOptionChange({ rules: rulesData });
    setDataChange(false);
  };

  return (
    <form className="px-2 mt-3" onSubmit={submitHandler}>
      {ruleList.map((item, ruleIndex) => {
        return (
          <div key={ruleIndex}>
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

            {item.next && createOperationList(ruleIndex)}
          </div>
        );
      })}

      <InputGroup className="mt-4">
        <LoadingButton type="submit" size="small" disabled={!dataChange}>
          Save
        </LoadingButton>
        <Button
          className="ml-2"
          variant="outlined"
          size="small"
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
