import { useGetForm } from '@frontend/shared/hooks/form';
import { ICondition, IField } from '@frontend/shared/types/form';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import { FormHelperText } from '@mui/material';
import { useEffect, useState } from 'react';
import InputGroup from '../../common/InputGroup';
import SelectFormFields from '../SelectFormFields';
import { getFieldCondition } from './DisplayFieldCondition';
import SelectForm from '../SelectForm';

interface ConditionFormProps {
  conditions: ICondition[];
  onConditionsChange: (newConditions: ICondition[]) => void;
  formFields?: IField[];
  field?: IField;
  onCancel?: () => void;
}

export default function FieldConditionForm({
  formFields,
  field,
  onCancel,
  onConditionsChange,
  conditions: initialConditions,
}: ConditionFormProps) {
  const [forms, setForms] = useState({});
  const defaultConditions = initialConditions?.length > 0 ? initialConditions : [defaultCondition];
  const [tempConditions, setTempConditions] = useState<ICondition[]>(defaultConditions);

  const conditions = field?._id ? tempConditions : defaultConditions;

  const setConditions = (newConditions) => {
    if (field?._id) {
      setTempConditions(newConditions);
    } else {
      onConditionsChange(newConditions);
    }
  };

  const onChange = (conditionIndex, condition: Partial<ICondition>) => {
    setConditions(conditions?.map((c, i) => (i === conditionIndex ? { ...c, ...condition } : c)));
  };

  const deleteCondition = (conditionIndex) => {
    setConditions(conditions?.filter((c, i) => i !== conditionIndex));
  };

  const handleSave = () => {
    onConditionsChange(conditions);
    onCancel();
  };

  return (
    <div>
      {field?._id && <Typography>Edit Condition</Typography>}
      {getFieldCondition(conditions, formFields, forms)}
      <div className={field?._id ? 'pl-3' : ''}>
        {conditions?.map((condition, conditionIndex) => (
          <ConditionComponent
            key={conditionIndex}
            conditionIndex={conditionIndex}
            condition={condition}
            field={field}
            onChange={(newCondition) => onChange(conditionIndex, newCondition)}
            deleteCondition={() => deleteCondition(conditionIndex)}
            formFields={formFields}
            setForm={(f) => {
              if (!forms?.[f?._id]?._id) {
                setForms({ ...forms, [f?._id]: f });
              }
            }}
          />
        ))}
        {conditions[conditions?.length - 1]?.value && (
          <Button
            size="small"
            onClick={() => setConditions([...conditions, defaultCondition])}
            startIcon={<Add />}
          >
            Add More Condition
          </Button>
        )}
        {field?._id && (
          <InputGroup>
            <Button size="small" variant="contained" onClick={handleSave}>
              Save Condition
            </Button>
            <Button className="m-2" size="small" variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          </InputGroup>
        )}
      </div>
    </div>
  );
}

const defaultCondition: ICondition = {
  operator: null,
  formId: '',
  fieldId: '',
  conditionType: null,
  value: '',
  constantValue: '',
};

interface ConditionComponentProps {
  conditionIndex: number;
  condition: ICondition;
  field: IField;
  onChange: (newCondition: Partial<ICondition>) => void;
  deleteCondition: () => void;
  formFields: any[];
  setForm: (form: any) => void;
}

const ConditionComponent = ({
  conditionIndex,
  condition,
  field = null,
  onChange,
  deleteCondition,
  formFields,
  setForm,
}: ConditionComponentProps) => {
  const [formName, setFormName] = useState(null);
  const { data, error } = useGetForm(condition?.formId || field?.form?._id);

  useEffect(() => {
    if (data?.getForm?._id) {
      setForm(data?.getForm);
      if (!condition?.formId) {
        onChange({ formId: data?.getForm?._id });
      }
    }
  }, [data?.getForm]);

  return (
    <div>
      {conditionIndex !== 0 && (
        <InputGroup>
          <div className="d-flex align-items-start">
            <FormControl size="small" fullWidth error={!condition?.operator}>
              <InputLabel>Operator</InputLabel>
              <Select
                value={condition?.operator}
                label="Operator"
                onChange={({ target }: any) => onChange({ operator: target.value })}
              >
                <MenuItem value="AND">AND ( && )</MenuItem>
                <MenuItem value="OR">OR ( || )</MenuItem>
              </Select>
              {!condition?.operator && <FormHelperText>Required</FormHelperText>}
            </FormControl>
            <IconButton edge="end" size="small" color="error" onClick={deleteCondition}>
              <Delete fontSize="small" />
            </IconButton>
          </div>
        </InputGroup>
      )}
      {!field?.form?._id && (
        <InputGroup>
          <SelectForm
            value={
              condition?.formId
                ? { _id: condition?.formId, name: formName || data?.getForm?.name }
                : null
            }
            onChange={(from) => {
              onChange({ formId: from?._id });
              setFormName(from?.name);
            }}
            error={!condition?.formId}
            helperText={!condition?.formId && 'Required'}
          />
        </InputGroup>
      )}
      {(condition?.formId || field?.form?._id) && (
        <InputGroup>
          <SelectFormFields
            formId={condition?.formId || field?.form?._id}
            value={condition?.fieldId}
            onChange={(fieldId) => onChange({ fieldId })}
            error={!condition?.fieldId}
            helperText="Required"
          />
        </InputGroup>
      )}
      <InputGroup>
        <FormControl size="small" fullWidth error={!condition?.conditionType}>
          <InputLabel>Condition Type</InputLabel>
          <Select
            value={condition?.conditionType}
            label="Condition Type"
            onChange={({ target }: any) => onChange({ conditionType: target.value })}
          >
            <MenuItem value="==">is Equal to</MenuItem>
            <MenuItem value="!=">is Not Equal to</MenuItem>
          </Select>
          {!condition?.conditionType && <FormHelperText>Required</FormHelperText>}
        </FormControl>
      </InputGroup>
      <InputGroup>
        <FormControl size="small" fullWidth error={!condition?.value}>
          <InputLabel>Value</InputLabel>
          <Select
            value={condition?.value}
            label="Value"
            onChange={({ target }) => onChange({ value: target.value })}
          >
            <MenuItem value="constantValue">Constant Value</MenuItem>
            <ListSubheader>Global state</ListSubheader>
            <MenuItem value="user.id">user.id</MenuItem>
            <MenuItem value="user.email">user.email</MenuItem>
            <MenuItem value="user.name">user.name</MenuItem>
            {formFields?.length > 0 && <ListSubheader>Form fields</ListSubheader>}
            {formFields
              ?.filter((formField) => formField?._id !== field?._id)
              ?.map((formField) => (
                <MenuItem value={formField?._id} key={formField?._id}>
                  {formField?.label}
                </MenuItem>
              ))}
          </Select>
          {!condition?.value && <FormHelperText>Required</FormHelperText>}
        </FormControl>
      </InputGroup>
      {condition?.value === 'constantValue' && (
        <InputGroup>
          <TextField
            fullWidth
            label="Constant Value"
            size="small"
            value={condition?.constantValue}
            onChange={({ target }) => onChange({ constantValue: target.value })}
            error={!condition?.constantValue}
            helperText="Required"
          />
        </InputGroup>
      )}
    </div>
  );
};
