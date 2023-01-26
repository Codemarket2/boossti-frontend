import { useCreateUpdateResponse } from '@frontend/shared/hooks/response';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import { IForm, IResponse, IField } from '@frontend/shared/types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetFieldRules } from '@frontend/shared/hooks/form';
import { useDebounce } from '@frontend/shared/hooks/condition/debounce';
import { parseResponse } from '@frontend/shared/hooks/response/getResponse';
import { validateResponse, validateValue } from '@frontend/shared/utils/validate';
import { onAlert } from '../../utils/alert';
import NotFound from '../common/NotFound';
import Overlay from '../common/Overlay';
import { FormViewChild, filterValues, defaultValue } from '../form2/FormView';
import FieldValuesMap from './FieldValuesMap';
import { InlineEditStateProps } from './DisplayResponse';

// imported related to the inline edit
import Field from '../form2/Field';
import LoadingButton from '../common/LoadingButton';

import { getFormula } from '../form2/field/formula/DisplayFormula';
import { evaluateFormula } from '../form2/field/formula/DisplayFormulaValue';
import { resolveCondition } from '../form2/field/field-condition/ResolveCondition';

interface IProps {
  form: IForm;
  field?: IField;
  response: IResponse;
  onClose: () => void;
  open?: boolean;
  overlay?: boolean;
  fieldId?: string;
  valueId?: string;
  editMode?: string;
  inlineEditState?: InlineEditStateProps;
  hasEditPermission?: boolean;
  setInlineEditState?: (value: InlineEditStateProps) => void;
}

export interface SubmitStateProps {
  validate: boolean;
  loading: boolean;
  onChanged: boolean;
}

export default function EditResponse({
  field,
  fieldId,
  valueId,
  editMode,
  form,
  response,
  open,
  overlay,
  hasEditPermission,
  inlineEditState,
  onClose,
  setInlineEditState,
}: IProps): any {
  const { handleCreateUpdateResponse, updateLoading } = useCreateUpdateResponse({
    onAlert,
  });
  const authorized = useAuthorization([response?.createdBy?._id, form?.createdBy?._id], true);

  const handleSubmit = async (values: any[]) => {
    const payload = {
      values,
      _id: response?._id,
    };
    const updatedResponse = await handleCreateUpdateResponse({
      payload,
      edit: true,
      fields: form?.fields,
    });
    // onClose();
    return updatedResponse;
  };

  const getFields = () => {
    if (fieldId) {
      return form?.fields
        ?.filter((f) => f?._id === fieldId)
        ?.map((f) => {
          let options: any = f?.options || {};
          if (typeof options === 'string') {
            options = JSON.parse(options);
          }
          options = { ...options, required: true };
          return { ...f, options };
        });
    }
    return form?.fields;
  };

  const inlineEdit = Boolean(fieldId);

  const initialSubmitState = {
    validate: false,
    loading: false,
    onChanged: false,
  };

  // variables
  const [enabledFields, setEnableFields] = useState({});
  const authState = useSelector(({ auth }: any) => auth);
  const authenticated = authState?.authenticated;
  const [submitState, setSubmitState] = useState<SubmitStateProps>(initialSubmitState);
  const localStorageKey = `unsavedResponse${form?._id}${inlineEditState?.edit}${response?._id}`;
  const [values, setValues] = useState(parseResponse({ values: response?.values })?.values || []);
  const [conditionFormsResponses, setConditionFormsResponses] = useState({
    forms: {},
    responses: {},
  });

  const autoSaveCallback = () => {
    if (values.length > 0 && submitState.onChanged && inlineEditState?.edit) {
      onSave();
    }
  };
  useDebounce({ callback: autoSaveCallback, time: 2000, value: values });

  // functions
  const filterHiddenFields = (fieldLoacal) => {
    if (fieldLoacal?.options?.hidden && fieldLoacal?.options?.hiddenConditions?.length > 0) {
      if (inlineEditState?.edit) return true;
      const result = resolveCondition({
        conditions: fieldLoacal?.options?.hiddenConditions,
        leftPartResponse: { formId: form?._id, values },
        forms: conditionFormsResponses?.forms,
        responses: conditionFormsResponses?.responses,
        authState,
      });
      return result;
    }
    return !fieldLoacal?.options?.hidden;
  };

  const filterDisabledFields = (fieldLocal) => {
    if (fieldLocal?.options?.disabled) {
      if (
        fieldLocal?.options?.disabled?.disabledConditions?.length > 0 &&
        enabledFields?.[fieldLocal?._id]
      ) {
        return true;
      }
      return false;
    }
    return true;
  };

  const onChange = (sValue, valueIndex) => {
    let newValue = { ...defaultValue, ...sValue };
    if (form?.slug === 'template') {
      const tempField = form?.fields?.find(
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
    if (!submitState?.onChanged) {
      setSubmitState((oldSubmitState) => ({ ...oldSubmitState, onChanged: true }));
    }
  };

  const onSave = async () => {
    let newValues = Array.from(values);
    form?.fields?.forEach((fieldLocal) => {
      if (fieldLocal?.options?.multipleValues) {
        const newValue = { ...defaultValue, field: fieldLocal._id, value: '' };
        const fieldValues = values.filter((f) => f.field === fieldLocal._id);
        if (
          !validateValue(true, fieldValues[fieldValues.length - 1], {
            ...fieldLocal,
            options: { ...fieldLocal.options, required: true },
          }).error
        ) {
          newValues = [...newValues, newValue];
        }
      }
    });
    // const payload =
    //   overrideValues?.length > 0 && !edit ? [...overrideValues, ...newValues] : [...newValues];
    const newResponse = await handleSubmit(newValues);
    window?.localStorage?.removeItem(localStorageKey);
    return newResponse;
    // setValues(response?.values);
    // setSubmitState((oldSubmitState) => ({ ...oldSubmitState, loading: false }));
  };

  const onSubmit = async () => {
    setSubmitState((oldSubmitState) => ({ ...oldSubmitState, loading: true }));
    const validate = validateResponse(
      form?.fields?.filter(filterHiddenFields).filter(filterDisabledFields),
      values,
    );
    if (validate) {
      setSubmitState((oldSubmitState) => ({ ...oldSubmitState, validate, loading: false }));
      return;
    }
    // if (authRequired && !authenticated) {
    //   setSubmitState({ ...submitState, loading: false });
    //   return setState((oldState) => ({ ...oldState, showAuthModal: true }));
    // }
    const newResponse = await onSave();
    if (newResponse) {
      setSubmitState(initialSubmitState);
      setValues([]);
      onClose();
      // if (showMessage) {
      //   showMessage(response);
      // }
    } else {
      setSubmitState((oldSubmitState) => ({ ...oldSubmitState, loading: false }));
    }
  };

  const EditComponent = (
    <div>
      {authorized ? (
        <FieldValuesMap
          authorized={hasEditPermission}
          field={field}
          displayFieldLabel
          verticalView
          response={response}
          // propsRelated to the inlineEdit
          form={form}
          onClose={onClose}
          onChange={onChange}
          onSubmit={onSubmit}
          loading={updateLoading}
          submitState={submitState}
          inlineEditState={inlineEditState}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );

  return (
    <>
      {overlay ? (
        <Overlay
          open={open}
          onClose={() => {
            const anwser = confirm('Are you sure you want to close?');
            if (anwser) {
              onClose();
            }
          }}
          title="Edit Response"
        >
          <div className="p-2">{EditComponent}</div>
        </Overlay>
      ) : (
        EditComponent
      )}
    </>
  );
}

// Earlier code

// <FormViewChild
//   inlineEdit={inlineEdit}
//   inlineEditFieldId={fieldId}
//   inlineEditValueId={valueId}
//   editMode={editMode}
//   authorized={authorized}
//   responseForm={response}
//   // fields={getFields()}
//   fields={form?.fields}
//   initialValues={response?.values}
//   handleSubmit={handleSubmit}
//   loading={updateLoading}
//   edit
//   formId={form?._id}
//   form={form}
//   responseId={response?._id}
//   onCancel={onClose}
//   formView={!inlineEdit && form?.settings?.formView}
//   showMessage={(r) => onClose()}
// />
// <FieldValuesMap
// field={field}
// response={response}

// />

// onClickEditField={(e) => {
//   let fieldIndex = 1;
//   form?.fields?.forEach((f, i) => {
//     if (f?._id === field?._id) {
//       fieldIndex = i + 1;
//     }
//   });
//   router.query.field = fieldIndex?.toString();
//   router.push(router);
//   setState({ ...initialState, field: fieldIndex });
// }}
