import moment from 'moment';
import { fileUpload } from '@frontend/shared/utils/fileUpload';
import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';
import Skeleton from '@material-ui/lab/Skeleton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@material-ui/icons';
import { getForm } from '@frontend/shared/hooks/form/getForm';
import { getResponse } from '@frontend/shared/hooks/response/getResponse';
import { useCreateUpdateResponse } from '@frontend/shared/hooks/response';
import ResponseList from '../response/ResponseList';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import Field from './Field';
import { validateValue } from './validate';
import { onAlert } from '../../utils/alert';
import DisplayRichText from '../common/DisplayRichText';
import Overlay from '../common/Overlay';
import AuthScreen from '../../screens/AuthScreen';
import { ResponseChild3 } from '../response/Response';
import DisplayValue from './DisplayValue';
import Leaderboard from '../response/Leaderboard';
import { getLabel } from '../response/SelectResponse';

interface IProps {
  form: any;
  parentId?: string;
  createCallback?: (response: any) => void;
  setResponded?: () => void;
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
  tempMedia: [],
  tempMediaFiles: [],
};

const initialState = {
  submitted: false,
  messages: [],
  response: null,
  formModal: false,
};

export default function FormViewWrapper({
  form,
  parentId,
  createCallback,
  setResponded,
}: IProps): any {
  const { handleCreateUpdateResponse, createLoading } = useCreateUpdateResponse(
    { onAlert },
    parentId,
  );
  const [state, setState] = useState(initialState);
  const [showResponse, setShowResponse] = useState(true);
  const authenticated = useSelector(({ auth }: any) => auth.authenticated);

  const handleSubmit = async (values) => {
    let payload: any = { formId: form?._id, values };
    let options = {};
    if (form?.settings?.customResponseLayout && form?.settings?.customSectionId) {
      options = { ...options, customSectionId: form?.settings?.customSectionId };
    }
    if (form?.settings?.active && form?.settings?.actions) {
      options = { ...options, actions: form?.settings?.actions };
    }
    payload = {
      ...payload,
      options: JSON.stringify(options),
    };
    const response = await handleCreateUpdateResponse(payload, form?.fields);
    if (response) {
      const messages = await Promise.all(
        form?.settings?.actions
          ?.filter((a) => a?.actionType === 'showMessage' && a?.active)
          ?.map(async (a) => {
            const message = await replaceVariables(
              a?.body,
              a?.variables,
              form?.fields,
              response?.values,
              parentId,
            );
            return message;
          }),
      );
      setState({ ...state, submitted: true, formModal: false, messages, response });
      if (createCallback) {
        createCallback(response);
      }
      if (setResponded) {
        setResponded();
      }
    }
    return response;
  };

  return (
    <div>
      {form?.settings?.showFormTitle && (
        <InputGroup className="text-center">
          <Typography variant="h4">{form?.name}</Typography>
        </InputGroup>
      )}
      {state.submitted ? (
        <div className="py-5">
          {state.messages?.map((message) => (
            <DisplayRichText value={message} />
          ))}
          {state.response && (
            <ResponseChild3 form={form} response={state.response} hideAuthor hideNavigation />
          )}
        </div>
      ) : form?.settings?.widgetType === 'leaderboard' ? (
        <Leaderboard formId={form?._id} settings={form?.settings} parentId={parentId} />
      ) : form?.settings?.widgetType === 'button' ? (
        <>
          <div className="text-center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setState({ ...state, formModal: true })}
            >
              {form?.settings?.buttonLabel || form?.name}
            </Button>
          </div>
          {state.formModal && (
            <Overlay
              open={state.formModal}
              onClose={() => setState({ ...state, formModal: false })}
            >
              <div className="p-2">
                <FormView
                  authRequired={!form?.settings?.authRequired}
                  fields={form?.fields}
                  handleSubmit={handleSubmit}
                  loading={createLoading}
                  fieldWiseView={form?.settings?.widgetType === 'oneField'}
                />
              </div>
            </Overlay>
          )}
        </>
      ) : form?.settings?.widgetType === 'displayResponses' ? (
        showResponse ? (
          <>
            <ResponseList form={form} />
            {authenticated && (
              <Button
                className="mt-2"
                size="small"
                color="primary"
                variant="contained"
                onClick={() => {
                  setShowResponse(false);
                }}
                startIcon={<AddIcon />}
              >
                Add Response
              </Button>
            )}
          </>
        ) : (
          <>
            <FormView
              authRequired={!form?.settings?.authRequired}
              fieldWiseView={form?.settings?.widgetType === 'oneField'}
              fields={form?.fields}
              handleSubmit={handleSubmit}
              loading={createLoading}
              viewResponse={() => {
                setShowResponse(true);
              }}
            />
          </>
        )
      ) : (
        <FormView
          authRequired={!form?.settings?.authRequired}
          fields={form?.fields}
          handleSubmit={handleSubmit}
          loading={createLoading}
          fieldWiseView={form?.settings?.widgetType === 'oneField'}
        />
      )}
    </div>
  );
}

interface IProps2 {
  fields: any;
  handleSubmit: (payload: any) => any;
  viewResponse?: () => void;
  loading?: boolean;
  onCancel?: () => void;
  initialValues?: any[];
  authRequired?: boolean;
  fieldWiseView?: boolean;
}

const initialSubmitState = {
  validate: false,
  loading: false,
};

export const filterValues = (values, field) => {
  let newValues = [{ ...defualtValue, field: field._id }];
  if (values.some((f) => f.field === field._id)) {
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
  viewResponse,
  loading,
  onCancel,
  initialValues = [],
  authRequired = false,
  fieldWiseView = false,
}: IProps2): any {
  const [values, setValues] = useState(initialValues);
  const [submitState, setSubmitState] = useState(initialSubmitState);
  const authenticated = useSelector(({ auth }: any) => auth.authenticated);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [page, setPage] = useState(0);
  const [hideField, setHideField] = useState(false);

  useEffect(() => {
    if (hideField) {
      setHideField(false);
    }
  }, [values]);

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
      const payload = [];
      for (let i = 0; i < values.length; i += 1) {
        const value = { ...values[i] };
        const field = fields?.filter((f) => f._id === value.field)[0];
        if (field) {
          if (field.fieldType === 'image' && value?.tempMedia?.length > 0) {
            let newMedia = [];
            if (value.tempMediaFiles.length > 0) {
              // eslint-disable-next-line no-await-in-loop
              newMedia = await fileUpload(value.tempMediaFiles, '/form-response');
            }
            if (newMedia?.length > 0) {
              newMedia = newMedia.map((n, i) => ({ url: n, caption: value?.tempMedia[i].caption }));
              value.media = newMedia;
            }
          }
        }
        const { tempMedia, tempMediaFiles, ...finalValue } = value;
        payload.push(finalValue);
      }
      const response = await handleSubmit(payload);
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
    const newValue = { ...defualtValue, field: fieldId, value: '' };
    if (values.some((f) => f.field === fieldId)) {
      newValues = [newValue];
    } else {
      newValues = [newValue, newValue];
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
        {(fieldWiseView && fields?.length > 1 ? [fields[page]] : fields)?.map((field) => (
          <Grid
            item
            xs={field?.options?.grid?.xs || 12}
            sm={field?.options?.grid?.sm}
            md={field?.options?.grid?.md}
            lg={field?.options?.grid?.lg}
            xl={field?.options?.grid?.xl}
            key={field._id}
          >
            <div style={field?.options?.style || {}}>
              <InputGroup key={field._id}>
                <Typography>
                  {field?.options?.required ? `${field?.label}*` : field?.label}
                </Typography>
                {filterValues(values, field).map((value, valueIndex) => (
                  <div key={valueIndex}>
                    {valueIndex === 0 ? (
                      <>
                        <div className="w-100">
                          {hideField ? (
                            <Skeleton height={200} />
                          ) : (
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
                          )}
                        </div>
                        {field?.options?.multipleValues && (
                          <Button
                            className="mt-2"
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              if (field?.fieldType === 'richTextarea') {
                                setHideField(true);
                              }
                              onAddOneMoreValue(field._id);
                            }}
                            startIcon={<AddIcon />}
                          >
                            Add
                          </Button>
                        )}
                      </>
                    ) : (
                      <div className="mb-2 d-flex align-items-start">
                        <div className="w-100">
                          <DisplayValue value={value} field={field} />
                          {validateValue(
                            submitState.validate,
                            value,
                            field.options,
                            field.fieldType,
                          ).error && (
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
                        <IconButton
                          onClick={() => {
                            if (field?.fieldType === 'richTextarea') {
                              setHideField(true);
                            }
                            onEditOneValue(field._id, valueIndex);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={() => onRemoveOneValue(field._id, valueIndex)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    )}
                  </div>
                ))}
              </InputGroup>
            </div>
          </Grid>
        ))}
        {fieldWiseView && fields?.length > 1 && (
          <div className="w-100 d-flex justify-content-between">
            {page !== 0 && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<ArrowBackIosRounded fontSize="small" />}
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                Back
              </Button>
            )}
            {page !== fields?.length - 1 && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                endIcon={<ArrowForwardIosRounded fontSize="small" />}
                onClick={() => {
                  setSubmitState({ ...submitState, loading: true });
                  let validate = false;
                  if (
                    fields[page]?.options?.required &&
                    values.filter((value) => value.field === fields[page]._id).length === 0
                  )
                    validate = true;
                  else
                    values
                      .filter((value) => value.field === fields[page]._id)
                      ?.forEach((tempValue) => {
                        if (
                          validateValue(
                            true,
                            tempValue,
                            fields[page].options,
                            fields[page].fieldType,
                          ).error
                        )
                          validate = true;
                      });

                  setSubmitState({ ...submitState, validate, loading: false });
                  if (!validate) setPage(page + 1);
                }}
              >
                Next
              </Button>
            )}
          </div>
        )}
        {((!fieldWiseView && fields?.length > 0) || fields?.length === page + 1) && (
          <Grid item xs={12}>
            <InputGroup style={{ display: 'flex' }}>
              <LoadingButton
                loading={submitState.loading || loading}
                onClick={onSubmit}
                variant="contained"
                color="primary"
                size="small"
              >
                Submit
              </LoadingButton>
              {viewResponse && (
                <Button
                  className="ml-3"
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    viewResponse();
                  }}
                >
                  Back
                </Button>
              )}
              {onCancel && (
                <Button
                  variant="outlined"
                  size="small"
                  className="ml-2"
                  onClick={onCancel}
                  disabled={submitState.loading || loading}
                >
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

const replaceVariables = async (oldBody, oldVariables, fields, values, pageId) => {
  let body = oldBody;
  const formIds = [];
  const forms = [];

  oldVariables?.forEach((variable) => {
    if (variable.formId && !formIds.includes(variable.formId)) {
      formIds.push(variable.formId);
    }
  });

  for (const formId of formIds) {
    const form = await getForm(formId);
    const response = await getResponse(formId, pageId);
    if (form && response) {
      forms.push({ ...form, response });
    }
  }

  const variables = oldVariables?.map((oneVariable) => {
    const variable = { ...oneVariable, value: '' };
    let field = null;
    let value = null;

    field = fields.find((f) => f._id === variable?.field);
    value = values?.find((v) => v.field === variable?.field);

    if (variable.formId) {
      const form = forms?.find((f) => f._id === variable.formId);
      if (form) {
        field = form?.fields.find((f) => f._id === variable?.field);
        value = form?.response?.values?.find((v) => v.field === variable?.field);
      }
    }

    if (field && value) {
      variable.value = getValue(field, value);
    }
    return variable;
  });
  variables.forEach((variable) => {
    body = body.split(`{{${variable.name}}}`).join(variable.value || '');
  });
  return body;
};

const getValue = (field, value) => {
  switch (field?.fieldType) {
    case 'number':
    case 'phoneNumber': {
      return value.valueNumber;
    }
    case 'date': {
      return value?.valueDate && moment(value?.valueDate).format('L');
    }
    case 'dateTime': {
      return value?.valueDate && moment(value?.valueDate).format('lll');
    }
    case 'checkbox': {
      return value.valueBoolean?.toString();
    }
    case 'select': {
      if (field?.options?.optionsListType === 'type') {
        return value?.itemId?.title;
      }
      if (field?.options?.optionsListType === 'existingForm') {
        return getLabel(field?.options?.formField, value?.response);
      }
      return value?.value;
    }
    default: {
      return value.value;
    }
  }
};
