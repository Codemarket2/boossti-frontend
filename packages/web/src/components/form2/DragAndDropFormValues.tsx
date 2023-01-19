// MUI
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import { Skeleton, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';

// SHARED

import { IField, IValue } from '@frontend/shared/types';
import { validateValue } from '@frontend/shared/utils/validate';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// OTHERS
import { useEffect } from 'react';
import DisplayValue from './DisplayValue';
import Field, { FieldProps } from './Field';
import { filterValues, combineArrays } from './FormView';
import ResponseDrawer from '../response/ResponseDrawer';
import LoadingButton from '../common/LoadingButton';
import InputGroup from '../common/InputGroup';

export interface DragAndDropFormValuesProps {
  rules: any;
  field: IField;
  fields: IField[];
  submitState: any;
  state: StateProps;
  fieldProps: Partial<FieldProps>;
  values: IValue[];
  setValues: (value: any) => void;
  setState: (oldState: any) => void;
  onChange: (savalue: any, valueIndex: any) => void;
  onRemoveOneValue: (fieldId: any, index: any) => void;
  inlineEdit?: boolean;
  inlineEditValueId?: string;
  formView?: string;
  disableSubmitButton?: any;
  loading?: boolean;
  onSubmit?: () => Promise<void>;
  onCancel?: () => void;
}

interface StateProps {
  displayExistingResponse: boolean;
  showAuthModal: boolean;
  page: number;
  hideField: boolean;
  editValue: {
    fieldId: any;
    index: any;
    valueId?: any;
  };
  showResponseDrawer: string;
  minimizeFields: boolean;
}

export default function DragAndDropFormValues({
  field,
  fields,
  state,
  values,
  rules,
  fieldProps,
  submitState,
  onChange,
  setState,
  setValues,
  onRemoveOneValue,
  inlineEdit,
  inlineEditValueId,
  disableSubmitButton,
  loading,
  onSubmit,
  onCancel,
  formView,
}: DragAndDropFormValuesProps) {
  useEffect(() => {
    if (inlineEditValueId !== '') {
      if (field?.fieldType === 'response' && !field?.options?.selectItem) {
        setState((oldState) => ({
          ...oldState,
          showResponseDrawer: `${field?._id}-${inlineEditValueId}`,
        }));
      } else {
        setState((oldState) => ({
          ...oldState,
          editValue: {
            fieldId: field._id,
            valueId: inlineEditValueId,
          },
        }));
      }
    }
  }, []);
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const onDragEnd = (result) => {
    const findField = fields.find((item) => item._id === result.source.droppableId);
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const newFields = reorder(
      filterValues(values, findField),
      result.source.index,
      result.destination.index,
    );
    const finalValues = combineArrays(values, newFields);
    setValues(finalValues);
  };
  const SubmitButtonComponent = (
    <Tooltip title={disableSubmitButton ? 'Enter value for all required fields' : 'Submit form'}>
      <div data-testid="submitButton">
        <LoadingButton
          disabled={disableSubmitButton}
          loading={!disableSubmitButton && (submitState.loading || loading)}
          onClick={onSubmit}
          variant="contained"
          color="primary"
          size="small"
        >
          Save
        </LoadingButton>
      </div>
    </Tooltip>
  );

  const CancelButton = (
    <>
      {onCancel && (
        <div data-testid="cancelButton">
          <Button
            variant="outlined"
            size="small"
            className="ml-2"
            onClick={onCancel}
            disabled={submitState.loading || loading}
          >
            Close
          </Button>
        </div>
      )}
    </>
  );
  return (
    <>
      {inlineEdit ? (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={field._id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {filterValues(values, field).map((value: any, valueIndex) => {
                    return (
                      <>
                        <Draggable key={value._id} draggableId={value._id} index={valueIndex}>
                          {(draggableProvided) => (
                            <div
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                            >
                              {!field?.options?.multipleValues ? (
                                <>
                                  <div className="mt-3" key={valueIndex}>
                                    {valueIndex !== filterValues(values, field)?.length - 1 && (
                                      <>
                                        {state.editValue?.fieldId === field._id &&
                                        state.editValue?.valueId === value?._id ? (
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
                                                    onChange(
                                                      {
                                                        ...changedValue,
                                                        field: field._id,
                                                      },
                                                      valueIndex,
                                                    )
                                                  }
                                                  value={value}
                                                />
                                              )}
                                            </div>
                                            {formView !== 'oneField' && (
                                              <Grid item xs={12}>
                                                <InputGroup style={{ display: 'flex' }}>
                                                  {SubmitButtonComponent}
                                                  {CancelButton}
                                                </InputGroup>
                                              </Grid>
                                            )}
                                          </>
                                        ) : (
                                          <div className="mb-2 d-flex align-items-start">
                                            <div className="w-100">
                                              <DisplayValue value={value} field={field} />
                                              {validateValue(submitState.validate, value, field)
                                                .error && (
                                                <FormHelperText className="text-danger">
                                                  {
                                                    validateValue(
                                                      submitState.validate,
                                                      value,
                                                      field,
                                                    ).errorMessage
                                                  }
                                                </FormHelperText>
                                              )}
                                            </div>
                                            {state.showResponseDrawer ===
                                              `${field?._id}-${value?._id}` &&
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
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="mt-3" key={valueIndex}>
                                    <>
                                      {state.editValue?.fieldId === field._id &&
                                      state.editValue?.valueId === value?._id ? (
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
                                                  onChange(
                                                    {
                                                      ...changedValue,
                                                      field: field._id,
                                                    },
                                                    valueIndex,
                                                  )
                                                }
                                                value={value}
                                              />
                                            )}
                                          </div>
                                          {formView !== 'oneField' && (
                                            <Grid item xs={12}>
                                              <InputGroup style={{ display: 'flex' }}>
                                                {SubmitButtonComponent}
                                                {CancelButton}
                                              </InputGroup>
                                            </Grid>
                                          )}
                                        </>
                                      ) : (
                                        <div className="mb-2 d-flex align-items-start">
                                          <div className="w-100">
                                            <DisplayValue value={value} field={field} />
                                            {validateValue(submitState.validate, value, field)
                                              .error && (
                                              <FormHelperText className="text-danger">
                                                {
                                                  validateValue(submitState.validate, value, field)
                                                    .errorMessage
                                                }
                                              </FormHelperText>
                                            )}
                                          </div>
                                          {state.showResponseDrawer ===
                                            `${field?._id}-${value?._id}` &&
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
                                        </div>
                                      )}
                                    </>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </Draggable>
                      </>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      ) : (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={field._id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {filterValues(values, field).map((value: any, valueIndex) => {
                    return (
                      <>
                        <Draggable key={value._id} draggableId={value._id} index={valueIndex}>
                          {(draggableProvided) => (
                            <div
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                            >
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
                                                onChange(
                                                  {
                                                    ...changedValue,
                                                    field: field._id,
                                                  },
                                                  valueIndex,
                                                )
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
                                          {validateValue(submitState.validate, value, field)
                                            .error && (
                                            <FormHelperText className="text-danger">
                                              {
                                                validateValue(submitState.validate, value, field)
                                                  .errorMessage
                                              }
                                            </FormHelperText>
                                          )}
                                        </div>
                                        {state.showResponseDrawer ===
                                          `${field?._id}-${value?._id}` &&
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
                                              onClick={() =>
                                                onRemoveOneValue(field._id, valueIndex)
                                              }
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
                            </div>
                          )}
                        </Draggable>
                      </>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
    </>
  );
}
