import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormHelperText from '@material-ui/core/FormHelperText';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useCreateUpdateResponse } from '@frontend/shared/hooks/response';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import Field from './Field';
import { validateValue } from './validate';
import { onAlert } from '../../utils/alert';
import DisplayRichText from '../common/DisplayRichText';
import Overlay from '../common/Overlay';
import AuthScreen from '../../screens/AuthScreen';
import DisplayValue from './DisplayValue';

interface IProps {
  form: any;
  parentId?: string;
  createCallback?: (response: any) => void;
}

export const defualtValue = {
  field: '',
  value: '',
  valueNumber: null,
  valueBoolean: null,
  valueDate: null,
  itemId: null,
  media: [],
  values: [],
};

export default function FormViewWrapper({
  form: { _id, name, fields, settings },
  parentId,
  createCallback,
}: IProps): any {
  const { handleCreateUpdateResponse, createLoading } = useCreateUpdateResponse(
    { onAlert },
    parentId,
  );
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (values) => {
    const payload = { formId: _id, values };
    const response = await handleCreateUpdateResponse(payload, fields);
    if (response) {
      setShowMessage(true);
      if (createCallback) {
        createCallback(response);
      }
    }
    return response;
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
          <DisplayRichText
            value={settings?.onSubmitMessage || '<h2 class="text-center">Thank you</h2>'}
          />
          <InputGroup className="text-center">
            {settings?.editResponse && (
              <Button variant="outlined" color="primary" size="small">
                Edit Response
              </Button>
            )}
          </InputGroup>
        </div>
      ) : (
        <FormView
          authRequired={!settings?.authRequired}
          fields={fields}
          handleSubmit={handleSubmit}
          loading={createLoading}
        />
      )}
    </div>
  );
}

interface IProps2 {
  fields: any;
  handleSubmit: (payload: any) => any;
  loading?: boolean;
  onCancel?: () => void;
  initialValues?: any[];
  authRequired?: boolean;
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
  authRequired = false,
}: IProps2): any {
  const [values, setValues] = useState(initialValues);
  const [submitState, setSubmitState] = useState(initialSubmitState);
  const authenticated = useSelector(({ auth }: any) => auth.authenticated);
  const [showAuthModal, setShowAuthModal] = useState(false);

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
    } else if (authRequired && !authenticated) {
      setSubmitState({ ...submitState, loading: false });
      return setShowAuthModal(true);
    } else {
      const response = await handleSubmit(values);
      if (response) {
        setSubmitState(initialSubmitState);
        setValues([]);
      } else {
        setSubmitState({ ...submitState, loading: false });
      }
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
    setValues([...newValues, ...values]);
  };

  const onRemoveOneValue = (fieldId, index) => {
    const oldValues = values.filter((f) => f.field !== fieldId);
    const newValues = values.filter((f) => f.field === fieldId).filter((f, i) => i !== index);
    setValues([...oldValues, ...newValues]);
  };

  const onEditOneValue = (fieldId, index) => {
    let selectedField = null;
    const oldValues = values.filter((f) => f.field !== fieldId);
    let newValues = values
      .filter((f) => f.field === fieldId)
      .filter((f, i) => {
        if (i !== index) {
          return true;
        }
        selectedField = f;
        return false;
      });
    if (selectedField) {
      newValues = [selectedField, ...newValues];
    }
    setValues([...oldValues, ...newValues]);
  };

  return (
    <div className="position-relative">
      {!authenticated && showAuthModal && (
        <Overlay onClose={() => setShowAuthModal(false)} open={showAuthModal} minWidth="60vw">
          <div className="p-2">
            <AuthScreen />
          </div>
        </Overlay>
      )}
      <Grid container spacing={0}>
        {fields?.map((field) => (
          <Grid
            item
            xs={field?.options?.grid?.xs || 12}
            sm={field?.options?.grid?.sm}
            md={field?.options?.grid?.md}
            lg={field?.options?.grid?.lg}
            xl={field?.options?.grid?.xl}
            key={field._id}
          >
            <InputGroup key={field._id}>
              <Typography>
                {field?.options?.required ? `${field?.label}*` : field?.label}
                {field?.options?.multipleValues && (
                  <IconButton
                    edge="end"
                    color="primary"
                    onClick={() => onAddOneMoreValue(field._id)}
                  >
                    <AddCircleIcon fontSize="small" />
                  </IconButton>
                )}
              </Typography>
              {filterValues(values, field).map((value, valueIndex) => (
                <div key={valueIndex} className="mb-2 d-flex align-items-center">
                  {valueIndex === 0 ? (
                    <div className="w-100">
                      <Field
                        {...field}
                        disabled={submitState.loading}
                        validate={submitState.validate}
                        label={field?.options?.required ? `${field?.label}*` : field?.label}
                        onChangeValue={(changedValue) =>
                          onChange({ ...changedValue, field: field._id }, valueIndex)
                        }
                        value={value}
                      />
                    </div>
                  ) : (
                    <div className="w-100">
                      <DisplayValue imageAvatar value={value} field={field} />
                      {validateValue(submitState.validate, value, field.options, field.fieldType)
                        .error && (
                        <FormHelperText className="text-danger">
                          {
                            validateValue(
                              submitState.validate,
                              value,
                              field.options,
                              field.fieldType,
                            ).errorMessage
                          }
                        </FormHelperText>
                      )}
                    </div>
                  )}

                  {filterValues(values, field)?.length > 1 && (
                    <>
                      {!(valueIndex === 0) && (
                        <IconButton onClick={() => onEditOneValue(field._id, valueIndex)}>
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton
                        edge="end"
                        onClick={() => onRemoveOneValue(field._id, valueIndex)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </div>
              ))}
            </InputGroup>
          </Grid>
        ))}
        {fields?.length > 0 && (
          <Grid item xs={12}>
            <InputGroup>
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
