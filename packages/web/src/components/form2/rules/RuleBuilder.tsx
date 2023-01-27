import { IRule } from '@frontend/shared/types/rules';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import InputGroup from '../../common/InputGroup';
import FieldConditionForm from '../field/field-condition/FieldConditionForm';

interface RuleBuilderProps {
  initialRule: IRule;
  onSave: (newRule: IRule) => void;
  onClose: () => void;
}

const defaultRule: IRule = {
  ruleType: 'flow',
  trigger: '',
  when: 'if',
  conditions: null,
  thenType: '',
  prop: '',
  propValue: '',
};

export default function RuleBuilder({ initialRule, onSave, onClose }: RuleBuilderProps) {
  const [rule, setRule] = useState(initialRule || defaultRule);

  const onSubmit = (event) => {
    event.preventDefault();
    onSave(rule);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <InputGroup>
          <FormControl variant="outlined" fullWidth size="small" required>
            <InputLabel>Rule Type</InputLabel>
            <Select
              value={rule.ruleType}
              onChange={({ target }) =>
                setRule((oldRule) => ({ ...oldRule, ruleType: target.value }))
              }
              label="Rule Type"
            >
              <MenuItem value="flow">Flow</MenuItem>
              <MenuItem value="accessControl">Access Control</MenuItem>
            </Select>
          </FormControl>
        </InputGroup>
        <InputGroup>
          <FormControl variant="outlined" fullWidth size="small" required>
            <InputLabel>Trigger</InputLabel>
            <Select
              value={rule.trigger}
              onChange={({ target }) =>
                setRule((oldRule) => ({ ...oldRule, trigger: target.value }))
              }
              label="Trigger"
            >
              <MenuItem value="onChange">onChange</MenuItem>
              <MenuItem value="onSubmit">onSubmit</MenuItem>
            </Select>
          </FormControl>
        </InputGroup>
        <InputGroup>
          <FormControl variant="outlined" fullWidth size="small" required>
            <InputLabel>When</InputLabel>
            <Select
              value={rule.when}
              onChange={({ target }) => setRule((oldRule) => ({ ...oldRule, when: target.value }))}
              label="When"
            >
              <MenuItem value="if">If</MenuItem>
              <MenuItem value="always">Always</MenuItem>
            </Select>
          </FormControl>
          {rule.when === 'if' && (
            <Box sx={{ pl: 2 }}>
              <FieldConditionForm
                conditions={rule.conditions}
                onConditionsChange={(conditions) =>
                  setRule((oldRule) => ({ ...oldRule, conditions }))
                }
              />
            </Box>
          )}
        </InputGroup>
        <InputGroup>
          <InputLabel>Then</InputLabel>
          <FormControl variant="outlined" fullWidth size="small" required>
            <InputLabel>Then Type</InputLabel>
            <Select
              value={rule.thenType}
              onChange={({ target }) =>
                setRule((oldRule) => ({ ...oldRule, thenType: target.value }))
              }
              label="Then Type"
            >
              <MenuItem value="goTo">Go to</MenuItem>
              <MenuItem value="propValue">Set Prop Value</MenuItem>
            </Select>
          </FormControl>
          {rule.thenType === 'goTo' && (
            <InputGroup>
              <TextField fullWidth label="location" size="small" />
            </InputGroup>
          )}
          {rule.thenType === 'propValue' && (
            <InputGroup>
              <Box sx={{ display: 'flex' }}>
                <FormControl variant="outlined" fullWidth size="small" required>
                  <InputLabel>Prop</InputLabel>
                  <Select
                    value={rule.prop}
                    onChange={({ target }) =>
                      setRule((oldRule) => ({ ...oldRule, prop: target.value }))
                    }
                    label="Prop"
                  >
                    <MenuItem value="multipleValues">multiple values</MenuItem>
                    <MenuItem value="disableSubmit">disableSubmit</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" fullWidth size="small" required>
                  <InputLabel>Value</InputLabel>
                  <Select
                    value={rule.propValue}
                    onChange={({ target }) =>
                      setRule((oldRule) => ({ ...oldRule, propValue: target.value }))
                    }
                    label="Value"
                  >
                    <MenuItem value="true">true</MenuItem>
                    <MenuItem value="false">false</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </InputGroup>
          )}
        </InputGroup>
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
        <Button variant="outlined" color="primary" className="ml-2" onClick={onClose}>
          Close
        </Button>
      </form>
    </div>
  );
}
