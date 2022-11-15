import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

// MUI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import Skeleton from '@mui/material/Skeleton';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosRounded from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
import Tooltip from '@mui/material/Tooltip';

// SHARED
import { parseResponse, useGetResponses } from '@frontend/shared/hooks/response/getResponse';
import {
  useConstraint,
  useCreateUpdateResponse,
  uniqueBetweenMultipleValues,
  useCheckIfAlreadySubmitted,
  useResolveCondition,
} from '@frontend/shared/hooks/response';
import { validateResponse, validateValue } from '@frontend/shared/utils/validate';
import { IValue } from '@frontend/shared/types';
import { IField, IForm } from '@frontend/shared/types/form';
import { fileUpload } from '@frontend/shared/utils/fileUpload';

// OTHERS
import { useGetFieldRules } from '@frontend/shared/hooks/form';
import ResponseList from '../response/ResponseList';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import Field from './Field';
import { onAlert } from '../../utils/alert';
import DisplayRichText from '../common/DisplayRichText';
import Overlay from '../common/Overlay';
import AuthScreen from '../../screens/AuthScreen';
import { DisplayResponse } from '../response/DisplayResponse';
import DisplayValue from './DisplayValue';
import Leaderboard from '../response/Leaderboard';
import SelectResponse from '../response/SelectResponse';
import { replaceVariables } from './variables';
import { evaluateFormula } from './field/formula/DisplayFormulaValue';
import DisplayFormula, { getFormula } from './field/formula/DisplayFormula';
import { getConditionsFormAndResponse } from './field/field-condition/DisplayFieldCondition';
import { resolveCondition } from './field/field-condition/ResolveCondition';
import ResponseDrawer from '../response/ResponseDrawer';
import DisplayConstraintError from './form-conditions/DisplayConstraintError';
import FieldUnique from './field/FieldUnique';
import UniqueMultipleValue from './field/UniqueMultipleValue';
import DisplayResponseById from '../response/DisplayResponseById';

interface FormViewWrapperProps {
  form: IForm;
  parentResponseId?: string;
  workflowId?: string;
  createCallback?: (response: any) => void;
  setResponded?: () => void;
  isPageOwner?: boolean;
  isTemplateInstance?: string;
  isAuthorized?: boolean;
  valueFilter?: any;
  overrideValues?: IValue[];
  onClickResponse?: (response, form) => void;
}

export const defaultValue = {
  field: '',
  value: '',
  valueNumber: null,
  valueBoolean: null,
  valueDate: null,
  media: [],
  values: [],
  template: null,
  page: null,
  form: null,
  response: null,
  options: { option: false },
  tempMedia: [],
  tempMediaFiles: [],
};

const initialState = {
  submitted: false,
  messages: [],
  response: null,
  formDrawer: false,
  responseDrawer: false,
  selectedResponse: null,

  selectItemAdd: false,
};

const initialSelectState = {
  loading: false,
  selectedFullResponse: null,
};

export default function FormViewWrapper({
  form,
  workflowId,
  createCallback,
  setResponded,
  isPageOwner,
  isTemplateInstance = '',
  isAuthorized,
  valueFilter,
  overrideValues,
  onClickResponse,
  parentResponseId,
}: FormViewWrapperProps): any {
  const { admin: isAdmin, authenticated } = useSelector(({ auth }: any) => auth);
  const { handleCreateUpdateResponse, createLoading } = useCreateUpdateResponse({
    parentResponseId,
    onAlert,
    workflowId,
  });
  const { alreadySubmitted } = useCheckIfAlreadySubmitted({
    formId: form?._id,
    workflowId,
  });

  const showOnlyMyResponses = !(isAdmin || isPageOwner) && form?.settings?.onlyMyResponses;

  const { data, error, refetch } = useGetResponses({
    formId: form?._id,
    onlyMy: showOnlyMyResponses,
    parentResponseId,
    workflowId,
    valueFilter,
  });

  const [state, setState] = useState(initialState);
  const [selectState, setSelectState] = useState(initialSelectState);

  const handleSubmit = async (values) => {
    let payload: any = { formId: form?._id, values };
    let options = {};
    if (form?.settings?.customResponseLayout && form?.settings?.customSectionId) {
      options = { ...options, customSectionId: form?.settings?.customSectionId };
    }

    if (
      form?.settings?.actions?.length > 0 &&
      form?.settings?.actions?.find((e) => e?.actionType === 'createSeoReport')
    ) {
      const actionforSeoReport = form?.settings?.actions?.find(
        (e) => e?.actionType === 'createSeoReport',
      );
      const valueOfSeoReport = values?.find((v) => v?.field === actionforSeoReport?.websiteUrl);
      const url = valueOfSeoReport?.value;
      if (url) {
        const seoReportResponse = await axios.get(
          'https://us-central1-boossti.cloudfunctions.net/lightHouseHTTP',
          { params: { url, id: 2 } },
        );
        values.push({
          value: JSON.stringify(seoReportResponse?.data, null, 2),
          field: actionforSeoReport?.report,
        });
      }
    }
    payload = {
      ...payload,
      options: JSON.stringify(options),
    };

    const response = await handleCreateUpdateResponse({ payload, fields: form?.fields });
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
      if (createCallback) {
        createCallback(response);
      }
      if (setResponded) {
        setResponded();
      }
      setState({ ...initialState, submitted: true, messages, response });
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

  if (alreadySubmitted && form?.settings?.canSubmitOnlyOneResponse) {
    return (
      <DisplayResponseById responseId={alreadySubmitted} hideBreadcrumbs deleteCallBack={refetch} />
    );
  }

  return (
    <div>
      {form?.settings?.showFormTitle && (
        <InputGroup className="text-center">
          <Typography variant="h4">{form?.name}</Typography>
        </InputGroup>
      )}
      {canSubmit && form?.settings?.widgetType !== 'responses' && (
        <>
          {state.submitted ? (
            <Overlay
              onClose={() => setState(initialState)}
              open={state.submitted}
              title="Your submitted response"
            >
              <div className="py-5">
                {state.messages?.map((message) => (
                  <DisplayRichText value={message} />
                ))}
                {state.response && (
                  <DisplayResponse
                    form={form}
                    response={state.response}
                    hideAuthor
                    hideNavigation
                  />
                )}
              </div>
            </Overlay>
          ) : (
            <>
              {state.formDrawer && (
                <Overlay open={state.formDrawer} onClose={() => setState(initialState)}>
                  <div className="p-2">
                    {form?.settings?.formView === 'selectItem' && !state.selectItemAdd ? (
                      <>
                        <SelectResponse
                          label={form?.name}
                          formId={form?._id}
                          formField={form?.settings?.selectItemField}
                          value={state.selectedResponse}
                          onChange={(selectedResponse: any) =>
                            setState({ ...state, selectedResponse })
                          }
                          onChangeFullResponse={(selectedFullResponse) =>
                            setSelectState({ ...selectState, selectedFullResponse })
                          }
                          openDrawer={() => setState({ ...state, selectItemAdd: true })}
                          allowCreate
                        />
                        <LoadingButton
                          className="my-2"
                          size="small"
                          variant="contained"
                          color="primary"
                          loading={createLoading}
                          onClick={async () => {
                            // if (appId) {
                            //   if (!selectState.selectedFullResponse) {
                            //     alert('Please select the response');
                            //   } else {
                            //     await handleCreateUpdateResponse({
                            //       payload: { ...selectState.selectedFullResponse },
                            //       edit: true,
                            //       fields: form?.fields,
                            //     });
                            //     await refetch();
                            //     setState(initialState);
                            //     setSelectState(initialSelectState);
                            //   }
                            // }
                          }}
                        >
                          Submit
                        </LoadingButton>
                      </>
                    ) : (
                      <FormView
                        overrideValues={overrideValues}
                        authRequired={form?.settings?.whoCanSubmit !== 'all' && !isAuthorized}
                        fields={form?.fields}
                        handleSubmit={handleSubmit}
                        loading={createLoading}
                        fieldWiseView={form?.settings?.formView === 'oneField'}
                        formId={form?._id}
                        onCancel={() => setState(initialState)}
                        form={form}
                      />
                    )}
                  </div>
                </Overlay>
              )}
              {form?.settings?.formView === 'leaderboard' ? (
                <Leaderboard formId={form?._id} settings={form?.settings} />
              ) : ['selectItem', 'button'].includes(form?.settings?.formView) ? (
                <>
                  <div className="text-center">
                    <Button
                      variant="contained"
                      className="mb-2"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => setState({ ...state, formDrawer: true })}
                    >
                      {form?.settings?.buttonLabel || form?.name}
                    </Button>
                  </div>
                </>
              ) : (
                <FormView
                  overrideValues={overrideValues}
                  authRequired={form?.settings?.whoCanSubmit !== 'all'}
                  fields={form?.fields}
                  handleSubmit={handleSubmit}
                  loading={createLoading}
                  fieldWiseView={form?.settings?.formView === 'oneField'}
                  formId={form?._id}
                  form={form}
                />
              )}
            </>
          )}
        </>
      )}
      {canViewResponses && form?.settings?.widgetType !== 'form' && (
        <>
          {form?.settings?.responsesView === 'button' ? (
            <>
              <div className="text-center">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setState({ ...state, responseDrawer: true })}
                >
                  {`${data?.getResponses?.count} Responses`}
                </Button>
              </div>
              {state.responseDrawer && (
                <Overlay
                  minWidth="85vw"
                  title="Responses"
                  open={state.responseDrawer}
                  onClose={() => setState(initialState)}
                >
                  <ResponseList
                    form={form}
                    workflowId={workflowId}
                    showOnlyMyResponses={showOnlyMyResponses}
                    isTemplateInstance={isTemplateInstance}
                    valueFilter={valueFilter}
                    onClickResponse={onClickResponse}
                    parentResponseId={parentResponseId}
                  />
                </Overlay>
              )}
            </>
          ) : (
            <ResponseList
              form={form}
              workflowId={workflowId}
              showOnlyMyResponses={showOnlyMyResponses}
              isTemplateInstance={isTemplateInstance}
              valueFilter={valueFilter}
              onClickResponse={onClickResponse}
              parentResponseId={parentResponseId}
            />
          )}
        </>
      )}
    </div>
  );
}

export interface FormViewProps {
  fields: IField[];
  handleSubmit: (payload: any) => any;
  loading?: boolean;
  onCancel?: () => void;
  initialValues?: any[];
  authRequired?: boolean;
  fieldWiseView?: boolean;
  formId?: any;
  edit?: boolean;
  responseId?: string;
  form?: any;
  inlineEdit?: boolean;
  overrideValues?: IValue[];
}

const initialSubmitState = {
  validate: false,
  loading: false,
};

export function FormView({
  inlineEdit = false,
  fields: tempFields,
  handleSubmit,
  loading,
  onCancel,
  initialValues = [],
  authRequired = false,
  fieldWiseView = false,
  formId,
  edit,
  responseId,
  form,
  overrideValues,
}: FormViewProps): any {
  const { rules } = useGetFieldRules({ formId: form?._id, fields: tempFields || form?.fields });
  const [values, setValues] = useState(parseResponse({ values: initialValues })?.values || []);
  const { constraintErrors, constraintsLoading } = useConstraint({ form, values, responseId });
  const { handleResolveCondition } = useResolveCondition();
  const [enabledFields, setEnableFields] = useState({});
  const [submitState, setSubmitState] = useState(initialSubmitState);
  const authState = useSelector(({ auth }: any) => auth);
  const authenticated = authState?.authenticated;
  const [state, setState] = useState({
    displayExistingResponse: false,
    showAuthModal: false,
    page: 0,
    hideField: false,
    editValue: {
      fieldId: null,
      index: null,
    },
    showResponseDrawer: '',
  });

  const [unique, setUnique] = useState(false);
  const [uniqueLoading, setUniqueLoading] = useState(false);
  const [conditionFormsResponses, setConditionFormsResponses] = useState({
    forms: {},
    responses: {},
  });

  // ONLY SHOW & VALIDATE REQUIRED FIELDS
  const fields = tempFields?.filter((field: IField) => {
    return (
      field?.options?.required &&
      !field?.options?.systemCalculatedAndSaved &&
      !overrideValues?.some((v) => v?.field === field?._id)
    );
  });

  const {
    uniqueBetweenMultipleValuesLoading,
    uniqueBetweenMultipleValuesError,
  } = uniqueBetweenMultipleValues({
    fields,
    values,
  });

  useEffect(() => {
    if (state.hideField) {
      setState((oldState) => ({ ...oldState, hideField: false }));
    }
  }, [values]);

  useEffect(() => {
    const defaultValues = [];
    let hiddenConditions = [];
    fields?.forEach((field) => {
      if (field?.options?.required && field?.options?.defaultValue) {
        if (!values?.some((v) => v?.field === field?._id)) {
          const tempValue = field?.options?.defaultValue || {};
          defaultValues.push({ value: '', field: field?._id, ...tempValue });
        }
      }
      if (field?.options?.hidden && field?.options?.hiddenConditions?.length > 0) {
        hiddenConditions = [...hiddenConditions, ...field?.options?.hiddenConditions];
      }
    });
    if (defaultValues?.length > 0) {
      setValues([...values, ...defaultValues]);
    }
    if (hiddenConditions?.length > 0) {
      getConditionForms(hiddenConditions);
    }
    resolveDisabledCondition();
  }, []);

  const resolveDisabledCondition = async () => {
    if (responseId && edit) {
      // eslint-disable-next-line no-restricted-syntax
      for (const field of fields) {
        if (field?.options?.disabled && field?.options?.disabledConditions?.length > 0) {
          // eslint-disable-next-line no-await-in-loop
          const result = await handleResolveCondition({
            responseId,
            conditions: field?.options?.disabledConditions,
          });
          setEnableFields((oldEnabledFields) => ({ ...oldEnabledFields, [field?._id]: result }));
        }
      }
    }
  };

  const getConditionForms = async (hiddenConditions) => {
    if (!edit) {
      const { responses: tempResponses, forms: tempForms } = await getConditionsFormAndResponse(
        hiddenConditions,
      );
      setConditionFormsResponses({ responses: tempResponses, forms: tempForms });
    }
  };

  const onChange = (sValue, valueIndex) => {
    let newValue = { ...defaultValue, ...sValue };
    if (form?.slug === 'template') {
      const tempField = fields?.find(
        (f) => f?.label?.toLowerCase() === 'widgets' && f?._id === sValue?.field,
      );
      if (tempField) {
        const options = newValue?.options || {};
        newValue = { ...newValue, options: { ...options, defaultWidget: true } };
      }
    }
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

    const validate = validateResponse(
      fields?.filter(filterHiddenFields).filter(filterDisabledFields),
      values,
    );
    if (validate) {
      setSubmitState({ ...submitState, validate, loading: false });
      return;
    }
    if (authRequired && !authenticated) {
      setSubmitState({ ...submitState, loading: false });
      return setState((oldState) => ({ ...oldState, showAuthModal: true }));
    }
    // const payload = [];
    const payload = overrideValues?.length > 0 ? [...overrideValues] : [];
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
            newMedia = newMedia.map((n, i2) => ({
              url: n,
              // caption: value?.tempMedia[i].caption,
              caption: value?.tempMedia[i2].caption,
            }));
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
  };

  const onAddOneMoreValue = (field) => {
    let newValues = [];
    const newValue = { ...defaultValue, field: field._id, value: '' };
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

  const fieldProps = {
    formId,
    responseId,
    setUniqueLoading,
    setUnique,
    validate: submitState.validate,
    onCancel,
  };

  const filterHiddenFields = (field) => {
    if (field?.options?.hidden && field?.options?.hiddenConditions?.length > 0) {
      if (edit) return true;
      // debugger;
      const result = resolveCondition({
        conditions: field?.options?.hiddenConditions,
        leftPartResponse: { formId, values },
        forms: conditionFormsResponses?.forms,
        responses: conditionFormsResponses?.responses,
        authState,
      });
      return result;
    }
    return !field?.options?.hidden;
  };

  const filterDisabledFields = (field) => {
    if (field?.options?.disabled) {
      if (field?.options?.disabled?.disabledConditions?.length > 0 && enabledFields?.[field?._id]) {
        return true;
      }
      return false;
    }
    return true;
  };

  const disableSubmitButton =
    validateResponse(fields?.filter(filterHiddenFields).filter(filterDisabledFields), values) ||
    unique ||
    uniqueLoading ||
    constraintsLoading ||
    constraintErrors?.find((con) => con?.existingResponseId)?.existingResponseId ||
    uniqueBetweenMultipleValuesError?.length > 0 ||
    uniqueBetweenMultipleValuesLoading;

  return (
    <div className="position-relative">
      {!authenticated && state.showAuthModal && (
        <Overlay
          onClose={() => setState((oldState) => ({ ...oldState, showAuthModal: false }))}
          open={state.showAuthModal}
          minWidth="60vw"
        >
          <div className="p-2">
            <AuthScreen />
          </div>
        </Overlay>
      )}
      <Grid container spacing={0} data-testid="fieldWiseView">
        {(fieldWiseView && fields?.length > 1 ? [fields[state.page]] : fields)
          ?.filter(filterHiddenFields)
          ?.map((field: any) => (
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
                  {!['label'].includes(field.fieldType) && (
                    <Typography data-testid="text-danger">
                      <span className={field?.options?.required ? 'text-danger' : ''}>
                        {field?.label}
                        {field?.options?.required && '*'}
                      </span>
                      <DisplayConstraintError
                        fields={fields}
                        fieldId={field._id}
                        constraintErrors={constraintErrors}
                        constraintsLoading={constraintsLoading}
                      />
                      {field?.options?.unique && (
                        <FieldUnique existingResponseId={unique} uniqueLoading={uniqueLoading} />
                      )}
                      {field?.options?.multipleValues &&
                        field?.options?.uniqueBetweenMultipleValues && (
                          <UniqueMultipleValue
                            loading={uniqueBetweenMultipleValuesLoading}
                            error={uniqueBetweenMultipleValuesError}
                            field={field}
                          />
                        )}
                    </Typography>
                  )}
                  {field?.options?.systemCalculatedAndView && (
                    <div className="mb-2">
                      <DisplayFormula formula={field?.options?.formula} fields={fields} />
                    </div>
                  )}
                  <>
                    <div className="w-100">
                      <div data-testid="field">
                        {state.hideField ? (
                          <Skeleton height={200} />
                        ) : (
                          <Field
                            {...fieldProps}
                            rules={rules?.[field?._id]}
                            field={{
                              ...field,
                              label: `${field?.label} ${field?.options?.required ? '*' : ''}`,
                            }}
                            disabled={
                              edit && field.options.notEditable
                                ? submitState.loading || field.options.notEditable
                                : submitState.loading ||
                                  field.options.systemCalculatedAndView ||
                                  (field?.options?.disabled && !enabledFields?.[field?._id])
                            }
                            validate={submitState.validate}
                            onChangeValue={(changedValue) => {
                              if (!field?.options?.systemCalculatedAndView) {
                                onChange(
                                  { ...changedValue, field: field._id },
                                  filterValues(values, field)?.length - 1,
                                );
                              }
                            }}
                            value={
                              field.options.systemCalculatedAndView
                                ? {
                                    valueNumber: evaluateFormula(
                                      getFormula(field?.options?.formula?.variables, [], values),
                                    ),
                                  }
                                : filterValues(values, field)[
                                    filterValues(values, field)?.length - 1
                                  ]
                            }
                          />
                        )}
                      </div>
                    </div>
                  </>
                  {filterValues(values, field).map((value: any, valueIndex) => (
                    <div className="mt-3" key={valueIndex}>
                      {valueIndex !== filterValues(values, field)?.length - 1 && (
                        <>
                          {state.editValue?.fieldId === field._id &&
                          state.editValue?.index === valueIndex ? (
                            <>
                              <div className="w-100">
                                {state.hideField ? (
                                  <Skeleton height={200} />
                                ) : (
                                  <Field
                                    {...fieldProps}
                                    rules={rules?.[field?._id]}
                                    field={{
                                      ...field,
                                      label: field?.options?.required
                                        ? `${field?.label}*`
                                        : field?.label,
                                    }}
                                    disabled={submitState.loading}
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
                                onClick={() =>
                                  setState((oldState) => ({
                                    ...oldState,
                                    editValue: {
                                      fieldId: null,
                                      index: null,
                                    },
                                  }))
                                }
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
                              {state.showResponseDrawer === `${field?._id}-${value?._id}` &&
                                value?.response?._id && (
                                  <ResponseDrawer
                                    open
                                    onClose={() =>
                                      setState((oldState) => ({
                                        ...oldState,
                                        showResponseDrawer: '',
                                      }))
                                    }
                                    responseId={value?.response?._id}
                                  />
                                )}
                              <Tooltip title="Edit Value">
                                <IconButton
                                  onClick={() => {
                                    if (
                                      field?.fieldType === 'response' &&
                                      !field?.options?.selectItem
                                    ) {
                                      setState((oldState) => ({
                                        ...oldState,
                                        showResponseDrawer: `${field?._id}-${value?._id}`,
                                      }));
                                    } else {
                                      setState((oldState) => ({
                                        ...oldState,
                                        editValue: {
                                          fieldId: field._id,
                                          index: valueIndex,
                                        },
                                      }));
                                    }
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              {!value?.options?.defaultWidget && (
                                <Tooltip title="Delete Value">
                                  <IconButton
                                    edge="end"
                                    onClick={() => onRemoveOneValue(field._id, valueIndex)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                  {field?.options?.multipleValues && (
                    <div data-testid="addOneMoreValue">
                      <Typography
                        className="my-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          if (field?.fieldType === 'richTextarea') {
                            setState((oldState) => ({ ...oldState, hideField: true }));
                          }
                          onAddOneMoreValue(field);
                        }}
                      >
                        <AddIcon fontSize="small" />
                        <Tooltip title={`You can add multiple values for ${field?.label} field`}>
                          <u>add more {field?.label}</u>
                          {/* <InfoOutlined className="ml-1" fontSize="small" /> */}
                        </Tooltip>
                      </Typography>
                    </div>
                  )}
                </InputGroup>
              </div>
            </Grid>
          ))}
        {fieldWiseView && fields?.length > 1 && (
          <div className="w-100 d-flex justify-content-between my-2">
            <div data-testid="backButton">
              {state.page !== 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<ArrowBackIosRounded fontSize="small" />}
                  onClick={() => setState((oldState) => ({ ...oldState, page: state.page - 1 }))}
                >
                  Back
                </Button>
              )}
            </div>
            <div data-testid="nextButton">
              {state.page !== fields?.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={
                    uniqueBetweenMultipleValuesError?.length > 0 ||
                    uniqueBetweenMultipleValuesLoading ||
                    unique ||
                    uniqueLoading
                  }
                  endIcon={<ArrowForwardIosRounded fontSize="small" />}
                  onClick={() => {
                    setSubmitState({ ...submitState, loading: true });
                    let validate = false;
                    values
                      .filter((value) => value.field === fields[state.page]._id)
                      ?.forEach((tempValue) => {
                        if (validateValue(true, tempValue, { ...fields[state.page] }).error) {
                          validate = true;
                        }
                      });
                    setSubmitState({ ...submitState, validate, loading: false });
                    if (!validate) setState((oldState) => ({ ...oldState, page: state.page + 1 }));
                  }}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        )}
        {((!fieldWiseView && fields?.length > 0) || fields?.length === state.page + 1) && (
          <Grid item xs={12}>
            <InputGroup style={{ display: 'flex' }}>
              <div data-testid="submitButton">
                <LoadingButton
                  disabled={disableSubmitButton}
                  loading={submitState.loading || loading}
                  onClick={onSubmit}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Submit
                </LoadingButton>
              </div>
              {onCancel && (
                <div data-testid="cancelButton">
                  <Button
                    variant="outlined"
                    size="small"
                    className="ml-2"
                    onClick={onCancel}
                    disabled={submitState.loading || loading}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </InputGroup>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export const filterValues = (values, field) => {
  // const defaultFieldValue = field?.options?.defaultValue || {};
  let newValues = [{ ...defaultValue, field: field._id }];

  if (values.some((f) => f.field === field._id)) {
    if (field?.options?.multipleValues) {
      newValues = values.filter((f) => f.field === field._id);
    } else {
      newValues = [values.find((f) => f.field === field._id)];
    }
  }
  return newValues?.map((value) => {
    let newOptions = { option: false };
    if (value?.options) {
      newOptions = value?.options || newOptions;
      if (typeof newOptions === 'string') {
        newOptions = JSON.parse(newOptions);
      }
    }
    return { ...value, options: newOptions };
  });
};
