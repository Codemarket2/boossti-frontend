import { useGetForm } from '@frontend/shared/hooks/form';
import { ConditionPart, ICondition, IField, IForm } from '@frontend/shared/types/form';
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
import FormHelperText from '@mui/material/FormHelperText';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';
import { IResponse } from '@frontend/shared/types';
import { useGetResponse } from '@frontend/shared/hooks/response';
import InputGroup from '../../../common/InputGroup';
import SelectFormFields from '../../SelectFormFields';
import { getFieldCondition } from './DisplayFieldCondition';
import SelectForm from '../../SelectForm';
import ErrorLoading from '../../../common/ErrorLoading';
import SelectResponse from '../../../response/SelectResponse';

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
  const [responses, setResponses] = useState({});
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
      {getFieldCondition({ conditions, formFields, forms, responses })}
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
            setForm={(newForm) => {
              if (!forms?.[newForm?._id]?._id) {
                setForms({ ...forms, [newForm?._id]: newForm });
              }
            }}
            setResponses={(newResponse) => {
              if (!responses?.[newResponse?._id]?._id) {
                setResponses({ ...forms, [newResponse?._id]: newResponse });
              }
            }}
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
  formFields: any[];
  setForm: (form: any) => void;
  setResponses: (response: IResponse) => void;
}

const ConditionComponent = ({
  conditionIndex,
  condition,
  field = null,
  onChange,
  deleteCondition,
  formFields,
  setForm,
  setResponses,
}: ConditionComponentProps) => {
  const [formNames, setFormNames] = useState({ left: '', right: '' });
  const { data, error } = useGetForm(condition?.left?.formId || field?.form?._id);
  const { data: dataRight } = useGetForm(condition?.right?.formId);

  const leftForm = data?.getForm;
  const rightForm = dataRight?.getForm;

  useEffect(() => {
    if (leftForm?._id) {
      setForm(leftForm);
      if (!condition?.left?.formId) {
        onChange({ left: { ...condition?.left, formId: leftForm?._id } });
      }
    }
  }, [leftForm]);

  useEffect(() => {
    if (rightForm?._id) {
      setForm(rightForm);
    }
  }, [rightForm]);

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
              condition?.left?.formId
                ? { _id: condition?.left?.formId, name: leftForm?.name || formNames?.left }
                : null
            }
            onChange={(from) => {
              const payload: ConditionPart = { ...condition?.left, formId: from?._id };
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
      {(condition?.left?.formId || field?.form?._id) && (
        <SelectSubField
          setForm={setForm}
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
      <InputGroup>
        <FormControl size="small" fullWidth error={!condition?.right}>
          <InputLabel>Value</InputLabel>
          <Select
            value={condition?.right?.value}
            label="Value"
            onChange={({ target }) =>
              onChange({ right: { ...condition?.right, value: target.value } })
            }
          >
            <MenuItem value="constantValue">Constant Value</MenuItem>
            <MenuItem value="form">Form</MenuItem>
            <ListSubheader>Global state (logged in User)</ListSubheader>
            <MenuItem value="auth._id">auth._id</MenuItem>
            <MenuItem value="auth.email">auth.email</MenuItem>
            <MenuItem value="auth.name">auth.name</MenuItem>
            {formFields?.length > 0 && <ListSubheader>Form fields</ListSubheader>}
            {formFields
              ?.filter((formField) => formField?._id !== field?._id)
              ?.map((formField) => (
                <MenuItem value={formField?._id} key={formField?._id}>
                  {formField?.label}
                </MenuItem>
              ))}
          </Select>
          {!condition?.right?.value && <FormHelperText>Required</FormHelperText>}
        </FormControl>
      </InputGroup>
      {condition?.right?.value === 'constantValue' && (
        <InputGroup>
          <TextField
            fullWidth
            label="Constant Value"
            size="small"
            value={condition?.right?.constantValue}
            onChange={({ target }) =>
              onChange({ right: { ...condition?.right, constantValue: target.value } })
            }
            error={!condition?.right?.constantValue}
            helperText={!condition?.right?.constantValue && 'Required'}
          />
        </InputGroup>
      )}
      {condition?.right?.value === 'form' && (
        <>
          <InputGroup>
            <SelectForm
              value={
                condition?.right?.formId
                  ? { _id: condition?.right?.formId, name: rightForm?.name || formNames?.right }
                  : null
              }
              onChange={(from) => {
                const payload = { ...condition?.right, formId: from?._id };
                if (condition?.right?.formId !== from?._id) {
                  payload.fieldId = null;
                  payload.responseId = null;
                  payload.subField = null;
                }
                onChange({ right: payload });
                setFormNames({ ...formNames, right: from?.name });
              }}
              error={!condition?.right?.formId}
              helperText={!condition?.right?.formId && 'Required'}
            />
          </InputGroup>
          {condition?.right?.formId && (
            <SelectSubField
              selectResponse
              setResponses={setResponses}
              setForm={setForm}
              subField={condition?.right}
              onChange={(newRight) => onChange({ right: { ...condition.right, ...newRight } })}
            />
          )}
        </>
      )}
    </div>
  );
};

interface SelectSubFieldProps {
  subField: ConditionPart;
  onChange: (fieldId: any) => void;
  setForm: (form: IForm) => void;
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
  const handleChange = (newSubField: Partial<ConditionPart>) => {
    onChange({ ...subField, ...newSubField });
  };

  useEffect(() => {
    if (data?.getForm) {
      setForm(data?.getForm);
    }
  }, [data?.getForm]);

  useEffect(() => {
    if (response?._id) {
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
