import { IHiddenCondition } from '@frontend/shared/types';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputGroup from '../../common/InputGroup';
import ConditionValueSelect from './ConditionValueSelect';

interface HiddenCondition {
  fields: any[];
  hiddenCondition: IHiddenCondition[];
  onHiddenConditionChange: (hiddenConditions: IHiddenCondition[]) => void;
}

export default function HiddenCondition({
  fields,
  hiddenCondition,
  onHiddenConditionChange,
}: HiddenCondition) {
  const onChange = (newCondition: Partial<IHiddenCondition>, index: number) => {
    const updatesCondition = hiddenCondition?.map((oldCondition, oldIndex) =>
      oldIndex === index ? { ...oldCondition, ...newCondition } : oldCondition,
    );
    onHiddenConditionChange(updatesCondition);
  };

  return (
    <div>
      {hiddenCondition?.map((condition, index) => (
        <div key={index}>
          <InputGroup>
            <FormControl fullWidth size="small">
              <InputLabel>Field</InputLabel>
              <Select
                label="Field"
                value={condition?.field}
                onChange={({ target }) => onChange({ field: target?.value }, index)}
              >
                {fields?.map((field) => (
                  <MenuItem value={field?._id}>{field?.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </InputGroup>
          <InputGroup>
            <FormControl fullWidth size="small">
              <InputLabel>Condition Type</InputLabel>
              <Select
                label="Condition Type"
                value={condition?.conditionType}
                onChange={({ target }) => onChange({ conditionType: target?.value }, index)}
              >
                <MenuItem value="==">is Equal to</MenuItem>
                <MenuItem value="!=">is not Equal to</MenuItem>
              </Select>
            </FormControl>
          </InputGroup>
          <InputGroup>
            <ConditionValueSelect
              fields={fields}
              value={condition?.value}
              onChange={(value) => onChange({ value }, index)}
            />
          </InputGroup>
        </div>
      ))}
    </div>
  );
}
