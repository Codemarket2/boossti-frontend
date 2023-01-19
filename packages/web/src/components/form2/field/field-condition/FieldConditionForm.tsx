import { useGetForm } from '@frontend/shared/hooks/form';
import { IConditionPart, ICondition, IField, IForm } from '@frontend/shared/types/form';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';
import { IResponse } from '@frontend/shared/types';
import { useGetResponse } from '@frontend/shared/hooks/response';
import InputGroup from '../../../common/InputGroup';
import SelectFormFields from '../../SelectFormFields';
import DisplayFieldCondition from './DisplayFieldCondition';
import SelectForm from '../../SelectForm';
import ErrorLoading from '../../../common/ErrorLoading';
import SelectResponse from '../../../response/SelectResponse';
import ConditionPart from './ConditionPart';

interface ConditionFormProps {
  conditions: ICondition[];
  onConditionsChange: (newConditions: ICondition[], permission: any) => void;
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
  // const [forms, setForms] = useState({});
  // const [responses, setResponses] = useState({});
  const defaultConditions = initialConditions?.length > 0 ? initialConditions : [defaultCondition];
  const [tempConditions, setTempConditions] = useState<ICondition[]>(defaultConditions);

  const conditions = field?._id ? tempConditions : defaultConditions;

  const setConditions = (newConditions) => {
    if (field?._id) {
      setTempConditions(newConditions);
    } else {
      onConditionsChange(newConditions, '');
    }
  };

  const onChange = (conditionIndex, condition: Partial<ICondition>) => {
    setConditions(conditions?.map((c, i) => (i === conditionIndex ? { ...c, ...condition } : c)));
  };

  const deleteCondition = (conditionIndex) => {
    setConditions(conditions?.filter((c, i) => i !== conditionIndex));
  };

  const handleSave = () => {
    onConditionsChange(conditions, 'view');
    onCancel();
  };

  return (
    <div>
      {field?._id && <Typography>Edit Condition</Typography>}
      <DisplayFieldCondition conditions={conditions} />
      <div className={field?._id ? 'pl-3' : ''}>
        {conditions?.map((condition, conditionIndex) => (
          <ConditionComponent
            key={conditionIndex}
            conditionIndex={conditionIndex}
            condition={condition}
            field={field}
            onChange={(newCondition) => onChange(conditionIndex, newCondition)}
            deleteCondition={() => deleteCondition(conditionIndex)}
            // formFields={formFields}
          />
        ))}
        {conditions[conditions?.length - 1]?.right?.value && (
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
  left: null,
  conditionType: null,
  right: null,
};

interface ConditionComponentProps {
  conditionIndex: number;
  condition: ICondition;
  field: IField;
  onChange: (newCondition: Partial<ICondition>) => void;
  deleteCondition: () => void;
}

const ConditionComponent = ({
  conditionIndex,
  condition,
  field = null,
  onChange,
  deleteCondition,
}: ConditionComponentProps) => {
  const [formNames, setFormNames] = useState({ left: '', right: '' });
  const { data, error } = useGetForm(condition?.left?.formId || field?.form?._id);

  const leftForm = data?.getForm;

  useEffect(() => {
    if (leftForm?._id) {
      if (!condition?.left?.formId) {
        onChange({ left: { ...condition?.left, formId: leftForm?._id } });
      }
    }
  }, [leftForm]);

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
          <FormControl size="small" fullWidth error={!condition?.conditionType}>
            <InputLabel>Action</InputLabel>

            <Select
              value="view"
              label="Condition Type"
              onChange={({ target }: any) => onChange({ conditionType: target.value })}
            >
              <MenuItem value="view">View</MenuItem>
            </Select>
          </FormControl>
        </InputGroup>
      )}
      {!field?.form?._id && (
        <InputGroup>
          <SelectForm
            value={
              condition?.left?.formId === 'auth'
                ? { _id: condition?.left?.formId, name: 'Auth' }
                : condition?.left?.formId
                ? { _id: condition?.left?.formId, name: leftForm?.name || formNames?.left }
                : null
            }
            onChange={(from) => {
              const payload: IConditionPart = { ...condition?.left, formId: from?._id };
              if (condition?.left?.formId !== from?._id) {
                payload.fieldId = null;
                payload.responseId = null;
                payload.subField = null;
              }
              onChange({ left: payload });
              setFormNames({ ...formNames, left: from?.name });
            }}
            error={!condition?.left?.formId}
            helperText={!condition?.left?.formId && 'Required'}
          />
        </InputGroup>
      )}
      {(condition?.left?.formId || field?.form?._id) && condition?.left?.formId !== 'auth' && (
        <SelectSubField
          subField={condition?.left}
          onChange={(newLeft) => onChange({ left: { ...condition.left, ...newLeft } })}
        />
      )}
      <InputGroup>
        <FormControl size="small" fullWidth error={!condition?.conditionType}>
          <InputLabel>Condition Type</InputLabel>
          <Select
            value={condition?.conditionType}
            label="Condition Type"
            onChange={({ target }: any) => onChange({ conditionType: target.value })}
          >
            <MenuItem value="==">== (is Equal to)</MenuItem>
            <MenuItem value="!=">!= (is Not Equal to)</MenuItem>
            <MenuItem disabled value=">">
              {`>`} (Greater Than)
            </MenuItem>
            <MenuItem disabled value="<">
              {`<`} (Less Than)
            </MenuItem>
            <MenuItem disabled value=">=">
              {`>=`} (Greater Than or Equal to)
            </MenuItem>
            <MenuItem disabled value="<=">
              {`<=`} (Less Than or Equal to)
            </MenuItem>
          </Select>
          {!condition?.conditionType && <FormHelperText>Required</FormHelperText>}
        </FormControl>
      </InputGroup>
      <ConditionPart
        conditionPart={condition?.right}
        onConditionPartChange={(newConditionPart) => onChange({ right: newConditionPart })}
      />
    </div>
  );
};

interface SelectSubFieldProps {
  subField: IConditionPart;
  onChange: (fieldId: any) => void;
  setForm?: (form: IForm) => void;
  selectResponse?: boolean;
  label?: string;
  setResponses?: (response: IResponse) => void;
}

export const SelectSubField = ({
  subField,
  setForm,
  onChange,
  selectResponse = false,
  label,
  setResponses,
}: SelectSubFieldProps) => {
  const [tempResponse, setTempResponse] = useState(null);
  const { data, error } = useGetForm(subField?.formId);
  const { data: responseData } = useGetResponse(subField?.responseId);

  const response = responseData?.getResponse;
  const handleChange = (newSubField: Partial<IConditionPart>) => {
    onChange({ ...subField, ...newSubField });
  };

  useEffect(() => {
    if (data?.getForm && setForm) {
      setForm(data?.getForm);
    }
  }, [data?.getForm]);

  useEffect(() => {
    if (response?._id && setResponses) {
      setResponses(response);
    }
  }, [response]);

  if (error) {
    return (
      <ErrorLoading error={error}>
        <Skeleton height={50} />
      </ErrorLoading>
    );
  }

  const form = data?.getForm;
  return (
    <>
      <InputGroup>
        <SelectFormFields
          formId={subField?.formId}
          value={subField?.fieldId}
          onChange={(newSubFieldId) => {
            const payload: any = { ...subField, formId: subField?.formId, fieldId: newSubFieldId };
            if (subField?.fieldId !== newSubFieldId) {
              if (payload?.subField) {
                payload.subField = null;
              }
              if (payload?.responseId) {
                payload.responseId = null;
              }
            }
            const subFieldFormId = form?.fields?.find((f) => f?._id === newSubFieldId)?.form?._id;
            if (subFieldFormId) {
              payload.subField = { ...payload.subField, formId: subFieldFormId };
            }
            handleChange(payload);
          }}
          error={!subField?.fieldId}
          helperText="Required"
          label={label}
          showSchemaFields
        />
      </InputGroup>
      {subField?.fieldId && selectResponse && (
        <SelectResponse
          floatingLabel
          formId={subField?.formId}
          formField={subField?.fieldId}
          value={subField?.responseId && (tempResponse || response)}
          onChange={(newResponse) => {
            handleChange({ responseId: newResponse?._id });
            setTempResponse(newResponse);
          }}
        />
      )}
      {subField?.subField?.formId && (
        <>
          <SelectSubField
            setForm={setForm}
            subField={subField?.subField}
            onChange={(nestedSubField) => handleChange({ subField: nestedSubField })}
            label="Select sub field"
          />
        </>
      )}
    </>
  );
};
