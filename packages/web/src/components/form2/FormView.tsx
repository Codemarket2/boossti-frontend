import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import parse from 'html-react-parser';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { useCreateResponse } from '@frontend/shared/hooks/response';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import Field from './Field';
import { validateValue } from './validate';
import { onAlert } from '../../utils/alert';

interface IProps {
  form: any;
}

export const defualtValue = {
  field: '',
  value: '',
  valueNumber: null,
  valueBoolean: null,
  valueDate: null,
  itemId: null,
  media: [],
};

export default function FormViewWrapper({ form: { _id, name, fields, settings } }: IProps): any {
  const { handleCreateResponse, createLoading } = useCreateResponse({ onAlert });
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (values) => {
    const payload = { formId: _id, values };
    await handleCreateResponse(payload, fields);
    setShowMessage(true);
  };
  return (
    <div>
      {settings?.showFormTitle && (
        <InputGroup className="text-center">
          <Typography variant="h4">{name}</Typography>
        </InputGroup>
      )}
      {showMessage ? (
        <div className="py-5">
          <div className="ck-content">
            {parse(settings?.onSubmitMessage || '<h2 class="text-center">Thank you</h2>')}
          </div>
          <InputGroup className="text-center">
            {settings?.editResponse && (
              <Button variant="outlined" color="primary" size="small">
                Edit Response
              </Button>
            )}
          </InputGroup>
        </div>
      ) : (
        <FormView fields={fields} handleSubmit={handleSubmit} loading={createLoading} />
      )}
    </div>
  );
}

interface IProps2 {
  fields: any;
  handleSubmit: (payload: any) => void;
  loading?: boolean;
  onCancel?: () => void;
  initialValues?: any[];
}

const initialSubmitState = {
  validate: false,
  // showOnSubmitMessage: false,
  loading: false,
};

export const filterValues = (values, field) => {
  let newValues = [{ ...defualtValue, field: field._id }];
  if (values.filter((f) => f.field === field._id).length) {
    if (field?.options?.multipleValues) {
      newValues = values.filter((f) => f.field === field._id);
    } else {
      newValues = [values.filter((f) => f.field === field._id)[0]];
    }
  }
  return newValues;
};

export function FormView({
  fields,
  handleSubmit,
  loading,
  onCancel,
  initialValues = [],
}: IProps2): any {
  const [values, setValues] = useState([]);
  const [submitState, setSubmitState] = useState(initialSubmitState);

  useEffect(() => {
    if (initialValues?.length > 0 && values?.length === 0) {
      setValues(initialValues);
    }
  }, [initialValues]);

  const onChange = (sValue, valueIndex) => {
    const newValue = { ...defualtValue, ...sValue };
    let newValues = [];
    let changed = false;
    let tempValueIndex = -1;
    newValues = values.map((oldValue) => {
      if (oldValue.field === newValue.field) {
        tempValueIndex += 1;
        if (tempValueIndex === valueIndex) {
          changed = true;
          return { ...oldValue, ...newValue };
        }
      }
      return oldValue;
    });
    if (!changed) {
      newValues = [...values, newValue];
    }
    setValues(newValues);
  };

  const onSubmit = async () => {
    setSubmitState({ ...submitState, loading: true });
    let validate = false;
    fields?.every((field) => {
      if (
        field?.options?.required &&
        values.filter((value) => value.field === field._id).length === 0
      ) {
        validate = true;
      } else {
        values
          .filter((value) => value.field === field._id)
          ?.map((tempValue) => {
            if (validateValue(true, tempValue, field.options, field.fieldType).error) {
              validate = true;
            }
            return tempValue;
          });
      }
      return !validate;
    });
    if (validate) {
      setSubmitState({ ...submitState, validate, loading: false });
    } else {
      await handleSubmit(values);
      setSubmitState(initialSubmitState);
      setValues([]);
    }
  };

  const onAddOneMoreValue = (fieldId) => {
    let newValues = [];
    if (values.filter((f) => f.field === fieldId).length === 0) {
      newValues = [
        { ...defualtValue, field: fieldId },
        { ...defualtValue, field: fieldId },
      ];
    } else {
      newValues = [{ ...defualtValue, field: fieldId }];
    }
    setValues([...values, ...newValues]);
  };

  const onRemoveOneValue = (fieldId) => {
    const oldValues = values.filter((f) => f.field !== fieldId);
    const newValues = values.filter((f) => f.field === fieldId);
    newValues.pop();
    setValues([...oldValues, ...newValues]);
  };

  // let newValues = values;

  // (values.filter((f) => f.field === field._id).length
  //               ? values.filter((f) => f.field === field._id)
  //               : [{ ...defualtValue, field: field._id }]
  //             )

  return (
    <div>
      <Grid container spacing={0}>
        {fields?.map((field) => (
          <Grid item xs={field?.options?.halfWidth ? 6 : 12} key={field._id}>
            <InputGroup key={field._id} className="">
              {field?.options?.multipleValues && (
                <>
                  <FormLabel>
                    {field?.options?.required ? `${field?.label}*` : field?.label}
                  </FormLabel>
                  {field?.options?.multipleValues && (
                    <>
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={() => onAddOneMoreValue(field._id)}
                      >
                        <AddCircleIcon fontSize="small" />
                      </IconButton>
                      {values.filter((f) => f.field === field._id).length > 1 && (
                        <IconButton
                          edge="end"
                          className="text-danger"
                          onClick={() => onRemoveOneValue(field._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </>
                  )}
                </>
              )}
              {filterValues(values, field).map((value, valueIndex) => (
                <div className="mb-2">
                  <Field
                    disabled={submitState.loading}
                    validate={submitState.validate}
                    {...field}
                    label={field?.options?.required ? `${field?.label}*` : field?.label}
                    onChangeValue={(changedValue) =>
                      onChange({ ...changedValue, field: field._id }, valueIndex)
                    }
                    value={value}
                  />
                </div>
              ))}
            </InputGroup>
          </Grid>
        ))}
        {fields?.length > 0 && (
          <Grid item xs={12}>
            <InputGroup className="px-2">
              <LoadingButton
                loading={submitState.loading || loading}
                onClick={onSubmit}
                variant="contained"
                color="primary"
                size="small"
              >
                Submit
              </LoadingButton>
              {onCancel && (
                <Button variant="outlined" size="small" className="ml-2" onClick={onCancel}>
                  Cancel
                </Button>
              )}
            </InputGroup>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
