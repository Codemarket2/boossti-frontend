import { Auth } from 'aws-amplify';
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
import { useGetResponses } from '@frontend/shared/hooks/response/getResponse';
import { useCreateUpdateResponse } from '@frontend/shared/hooks/response';
import { validateValue } from '@frontend/shared/utils/validate';
import ResponseList from '../response/ResponseList';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import Field from './Field';
import { onAlert } from '../../utils/alert';
import DisplayRichText from '../common/DisplayRichText';
import Overlay from '../common/Overlay';
import AuthScreen from '../../screens/AuthScreen';
import { ResponseChild3 } from '../response/Response';
import DisplayValue from './DisplayValue';
import Leaderboard from '../response/Leaderboard';
import SelectResponse from '../response/SelectResponse';
import { replaceVariables } from './variables';
import projectConfig from '../../../../shared/index';

interface IProps {
  form: any;
  parentId?: string;
  workFlowFormReponseParentId?: string;
  createCallback?: (response: any) => void;
  setResponded?: () => void;
  isPageOwner?: boolean;
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
  selectItemValue: null,
  drawer: false,
  temp: null,
};

export default function FormViewWrapper({
  form,
  parentId,
  workFlowFormReponseParentId,
  createCallback,
  setResponded,
  isPageOwner,
}: IProps): any {
  const { handleCreateUpdateResponse, createLoading } = useCreateUpdateResponse(
    { onAlert },
    parentId,
    workFlowFormReponseParentId,
  );

  const showOnlyMyResponses = !isPageOwner && form?.settings?.onlyMyResponses;

  const { data, error, refetch } = useGetResponses(
    form?._id,
    parentId,
    null,
    showOnlyMyResponses,
    workFlowFormReponseParentId,
  );
  const [state, setState] = useState(initialState);
  const authenticated = useSelector(({ auth }: any) => auth.authenticated);
  const [showOverlayResult, setShowOverlayResult] = useState(true);
  const [checkNewUser, setCheckNewUser] = useState(true);

  const verifyIfUserExist = async (payload) => {
    const { password, email, name } = payload;
    try {
      const response = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          name,
          picture: projectConfig.defaultProfile,
        },
      });
      if (response) {
        setCheckNewUser(true);
      }
    } catch (error) {
      setCheckNewUser(false);
    }
  };

  const handleSubmit = async (values) => {
    let nPassword = '';
    if (
      !authenticated &&
      form?.settings?.actions?.length > 0 &&
      form?.settings?.actions?.find((a) => a.actionType === 'generateNewUser')
    ) {
      let emailId = '';
      let nameId = '';
      const action = form.settings?.actions?.filter((a) => a.actionType === 'generateNewUser')[0];
      emailId = action.emailFieldId;
      nameId = action.nameFieldId;
      let email = '';
      let name = '';
      values.forEach((element) => {
        if (element.field === emailId) {
          email = element.value;
        } else if (element.field === nameId) {
          name = element.value;
        }
      });
      const payload = {
        email,
        name,
        password: Math.random().toString(36).slice(2),
      };
      const { password } = payload;
      nPassword = password;
      await verifyIfUserExist(payload);
    }
    let payload: any = { formId: form?._id, values };
    let options = {};
    if (form?.settings?.customResponseLayout && form?.settings?.customSectionId) {
      options = { ...options, customSectionId: form?.settings?.customSectionId };
    }
    if (form?.settings?.actions?.length > 0) {
      options = {
        ...options,
        actions: form?.settings?.actions,
        password: nPassword,
        generateNewUserEmail: checkNewUser,
      };
    }
    payload = {
      ...payload,
      options: JSON.stringify(options),
    };

    const response = await handleCreateUpdateResponse(payload, form?.fields);
    if (response) {
      let messages = [];
      if (form?.settings?.actions?.length > 0) {
        messages = await Promise.all(
          form?.settings?.actions
            ?.filter((a) => a?.actionType === 'showMessage' && a?.active)
            ?.map(async (a) => {
              const message = await replaceVariables(a?.body, a?.variables, form, response);
              return message;
            }),
        );
      }
      await refetch();
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

  const canSubmit =
    (authenticated && !form?.settings?.whoCanSubmit) ||
    (authenticated &&
      isPageOwner &&
      form?.settings?.whoCanSubmit === 'onlyPageOwner' &&
      (form?.settings?.multipleResponses || data?.getResponses?.data?.length === 0)) ||
    (authenticated && form?.settings?.whoCanSubmit === 'authUser') ||
    form?.settings?.whoCanSubmit === 'all';

  const canViewResponses =
    (authenticated && !form?.settings?.whoCanViewResponses) ||
    (authenticated && isPageOwner && form?.settings?.whoCanViewResponses === 'onlyPageOwner') ||
    (authenticated && form?.settings?.whoCanViewResponses === 'authUser') ||
    form?.settings?.whoCanViewResponses === 'all';

  return (
    <div>
      {form?.settings?.showFormTitle && (
        <InputGroup className="text-center">
          <Typography variant="h4">{form?.name}</Typography>
        </InputGroup>
      )}
      {canViewResponses &&
        form?.settings?.widgetType !== 'form' &&
        form?.settings?.responsesView === 'button' && (
          <>
            <div className="text-center">
              <Button variant="outlined" onClick={() => setState({ ...state, drawer: true })}>
                {`${data?.getResponses?.count} Responses`}
              </Button>
            </div>
            {state.drawer && (
              <Overlay
                minWidth="85vw"
                title="Responses"
                open={state.drawer}
                onClose={() => setState({ ...state, drawer: false })}
              >
                <ResponseList form={form} parentId={parentId} />
              </Overlay>
            )}
          </>
        )}
      {canSubmit && form?.settings?.widgetType !== 'responses' && (
        <>
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
                  fieldWiseView={form?.settings?.formView === 'oneField'}
                />
              </div>
            </Overlay>
          )}
          {state.submitted ? (
            <Overlay
              onClose={() => {
                setShowOverlayResult(false);
                setState({ ...state, submitted: false });
              }}
              open={showOverlayResult}
              title="Your submitted response"
            >
              <div className="py-5">
                {state.messages?.map((message) => (
                  <DisplayRichText value={message} />
                ))}
                {state.response && (
                  <ResponseChild3 form={form} response={state.response} hideAuthor hideNavigation />
                )}
              </div>
            </Overlay>
          ) : (
            <>
              {form?.settings?.formView === 'leaderboard' ? (
                <Leaderboard formId={form?._id} settings={form?.settings} parentId={parentId} />
              ) : form?.settings?.formView === 'button' ? (
                <>
                  <div className="text-center">
                    <Button
                      variant="contained"
                      // color="primary"
                      onClick={() => setState({ ...state, formModal: true })}
                    >
                      {form?.settings?.buttonLabel || form?.name}
                    </Button>
                  </div>
                </>
              ) : form?.settings?.formView === 'selectItem' ? (
                <>
                  {/* <SelectItemView
                    formId={form?.settings?.selectItemForm}
                    settings={form?.settings}
                  /> */}
                  <SelectResponse
                    label={form?.name}
                    formId={form?._id}
                    formField={form?.settings?.selectItemField}
                    value={state.temp}
                    onChange={function (temp: any): void {
                      setState({ ...state, temp });
                    }}
                    openDrawer={() => setState({ ...state, formModal: true })}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      // const responseId = state?.selectItemValue?._id;
                      // const response = await handleCreateUpdateResponseParent({ _id: responseId });
                      // if (response) {
                      //   console.log(response);
                      // }
                    }}
                  >
                    Submit
                  </Button>

                  {/* <SelectResponse
                    label={
                      form?.fields?.find((fld) => fld._id === form?.settings?.selectItemField)
                        ?.label
                    }
                    formId={form?._id}
                    formField={form?.settings?.selectItemField}
                    value={state?.selectItemValue}
                    onChange={(newValue) => setState({ ...state, selectItemValue: newValue })}
                    error={
                      validateValue(true, state, form?.settings, 'form').error ||
                      !form?.settings?.selectItemField
                    }
                    helperText={
                      validateValue(true, state, form?.settings, 'form').errorMessage ||
                      (!form?.settings?.selectItemField ? 'Form field not selected' : '')
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      // const responseId = state?.selectItemValue?._id;
                      // const response = await handleCreateUpdateResponseParent({ _id: responseId });
                      // if (response) {
                      //   console.log(response);
                      // }
                    }}
                  >
                    Submit
                  </Button> */}
                </>
              ) : (
                <FormView
                  authRequired={!form?.settings?.authRequired}
                  fields={form?.fields}
                  handleSubmit={handleSubmit}
                  loading={createLoading}
                  fieldWiseView={form?.settings?.formView === 'oneField'}
                />
              )}
            </>
          )}
        </>
      )}
      {canViewResponses &&
        form?.settings?.widgetType !== 'form' &&
        form?.settings?.responsesView !== 'button' && (
          <ResponseList
            form={form}
            parentId={parentId}
            workFlowFormReponseParentId={workFlowFormReponseParentId}
            showOnlyMyResponses={showOnlyMyResponses}
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
  loading,
  onCancel,
  initialValues = [],
  authRequired = false,
  fieldWiseView = false,
}: IProps2): any {
  const [values, setValues] = useState(initialValues);
  const [editValue, setEditValue] = useState({ fieldId: null, index: null });
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
            if (validateValue(true, tempValue, field).error) {
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

  const onAddOneMoreValue = (field) => {
    let newValues = [];
    const newValue = { ...defualtValue, field: field._id, value: '' };
    const fieldValues = values.filter((f) => f.field === field._id);
    if (
      fieldValues.length > 0 &&
      !validateValue(true, fieldValues[fieldValues.length - 1], {
        ...field,
        options: { ...field.options, required: true },
      }).error
    ) {
      newValues = [newValue];
    } else if (!submitState.validate) {
      setSubmitState({ ...submitState, validate: true });
    }
    setValues([...values, ...newValues]);
  };

  const onRemoveOneValue = (fieldId, index) => {
    const oldValues = values.filter((f) => f.field !== fieldId);
    const newValues = values.filter((f) => f.field === fieldId).filter((f, i) => i !== index);
    setValues([...oldValues, ...newValues]);
  };

  // const onEditOneValue = (fieldId, index) => {
  //   const oldValues = values.filter((f) => f.field !== fieldId);
  //   const currentFieldValues = values.filter((f) => f.field === fieldId);
  //   const newValues = currentFieldValues.map((f, i) => {
  //     let tempValue = { ...f };
  //     if (i === currentFieldValues.length - 1) {
  //       tempValue = currentFieldValues[index];
  //     }
  //     if (i === index) {
  //       tempValue = currentFieldValues[currentFieldValues.length - 1];
  //     }
  //     return tempValue;
  //   });
  //   setValues([...oldValues, ...newValues]);
  // };

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
                          onChange(
                            { ...changedValue, field: field._id },
                            filterValues(values, field)?.length - 1,
                          )
                        }
                        value={filterValues(values, field)[filterValues(values, field)?.length - 1]}
                      />
                    )}
                  </div>
                  {field?.options?.multipleValues && (
                    <Button
                      className="my-2"
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        if (field?.fieldType === 'richTextarea') {
                          setHideField(true);
                        }
                        onAddOneMoreValue(field);
                      }}
                      startIcon={<AddIcon />}
                    >
                      Add
                    </Button>
                  )}
                </>
                {filterValues(values, field).map((value, valueIndex) => (
                  <div key={valueIndex}>
                    {valueIndex !== filterValues(values, field)?.length - 1 && (
                      <>
                        {editValue.fieldId === field._id && editValue.index === valueIndex ? (
                          <>
                            <div className="w-100">
                              {hideField ? (
                                <Skeleton height={200} />
                              ) : (
                                <Field
                                  {...field}
                                  disabled={submitState.loading}
                                  validate={submitState.validate}
                                  label={
                                    field?.options?.required ? `${field?.label}*` : field?.label
                                  }
                                  onChangeValue={(changedValue) =>
                                    onChange({ ...changedValue, field: field._id }, valueIndex)
                                  }
                                  value={value}
                                />
                              )}
                            </div>
                            <Button
                              className="my-2"
                              size="small"
                              color="primary"
                              variant="contained"
                              onClick={() => setEditValue({ fieldId: null, index: null })}
                            >
                              Save
                            </Button>
                          </>
                        ) : (
                          <div className="mb-2 d-flex align-items-start">
                            <div className="w-100">
                              <DisplayValue value={value} field={field} />
                              {validateValue(submitState.validate, value, field).error && (
                                <FormHelperText className="text-danger">
                                  {validateValue(submitState.validate, value, field).errorMessage}
                                </FormHelperText>
                              )}
                            </div>
                            <IconButton
                              onClick={() =>
                                setEditValue({ fieldId: field._id, index: valueIndex })
                              }
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
                      </>
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
                        if (validateValue(true, tempValue, { ...fields[page] }).error)
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
