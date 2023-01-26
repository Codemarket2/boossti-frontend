import { IField, IForm, IResponse } from '@frontend/shared/types';
// import Box from '@mui/material/Box';
import React, { Fragment, useState } from 'react';
import { useCreateUpdateResponse, useResolveCondition } from '@frontend/shared/hooks/response';
import { useDebounce } from '@frontend/shared/hooks/condition/debounce';
// import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useGetFieldRules } from '@frontend/shared/hooks/form';
import { parseResponse } from '@frontend/shared/hooks/response/getResponse';
import CommentLikeShare from '../comment/CommentLikeShare';
import DisplayRichText from '../common/DisplayRichText';
import DisplayValue from '../form2/DisplayValue';
import DisplayFormulaValue, { evaluateFormula } from '../form2/field/formula/DisplayFormulaValue';
import StarRating from '../starRating/starRating';
import AddResponseButton from './AddResponseButton';
import { InlineEditStateProps } from './DisplayResponse';
// import DependantResponses from './DependantResponses';
import { onAlert } from '../../utils/alert';

// imported related to the inline edit
import Field from '../form2/Field';
import InputGroup from '../common/InputGroup';
import { SubmitStateProps } from './EditResponse';
import LoadingButton from '../common/LoadingButton';
import { filterValues, defaultValue } from '../form2/FormView';
import { getFormula } from '../form2/field/formula/DisplayFormula';

interface IFieldValuesMap {
  field: IField;
  response: IResponse;
  verticalView?: boolean;
  authorized?: boolean;
  displayFieldLabel?: boolean;
  showEdit?: boolean;
  inlineEdit?: boolean;
  onClickEditField?: (fieldId: string, valueId: string, editMode: string) => void;
  form?: IForm;
  onClose?: () => void;
  inlineEditState?: InlineEditStateProps;
  submitState?: SubmitStateProps;
  onChange?: (sValue: any, valueIndex: any) => void;
  onClickInlineEdit?: (fieldId: string, valueId: string, editMode: string) => void;
  onSubmit?: () => Promise<void>;
  loading?: boolean;
}

export default function FieldValuesMap({
  field,
  response,
  showEdit = true,
  verticalView,
  authorized,
  displayFieldLabel,
  onClickEditField,
  inlineEdit,
  form,
  onClose,
  inlineEditState,
  onClickInlineEdit,
  onChange,
  submitState,
  onSubmit,
  loading,
}: IFieldValuesMap) {
  const { handleCreateUpdateResponse } = useCreateUpdateResponse({ onAlert });
  const values = response?.values?.filter((v) => v.field === field._id);
  // const [fieldValues, setFieldValues] = useState(
  //   response?.values?.filter((v) => v.field === field._id),
  // );
  // const [values, setValues] = useState(parseResponse({ values: response?.values })?.values || []);
  const [disabled, setDisabled] = useState(false || field?.options?.disabled);
  const { handleResolveCondition } = useResolveCondition();

  const checkDisabledCondition = async () => {
    if (field?.options?.disabled && field?.options?.disabledConditions?.length > 0) {
      const result = await handleResolveCondition({
        conditions: field?.options?.disabledConditions,
        responseId: response?._id,
      });
      setDisabled(!result);
    }
  };
  useDebounce({
    callback: checkDisabledCondition,
    value: response,
  });

  // edit function changes to the old state variables
  // const fieldValues = response?.values?.filter((v) => v.field === field._id);
  // const [values, setValues] = useState(parseResponse({ values: response?.values })?.values || []);

  // // variabled
  const [unique, setUnique] = useState(false);
  const [enabledFields, setEnableFields] = useState({});
  const [uniqueLoading, setUniqueLoading] = useState(false);
  const { rules } = useGetFieldRules({ formId: form?._id, fields: form?.fields });

  const fieldProps = {
    formId: form?._id,
    responseId: response?._id,
    setUniqueLoading,
    setUnique,
    validate: submitState?.validate,
    onCancel: onClose,
  };

  // // //componentsUsable
  const SubmitButtonComponent = (
    <>
      {onSubmit && submitState && (
        <>
          <Tooltip title="Submit form">
            <div data-testid="submitButton">
              <LoadingButton
                // disabled={disableSubmitButton}
                // loading={!disableSubmitButton && (submitState.loading || loading)}
                loading={submitState?.loading || loading}
                onClick={onSubmit}
                variant="contained"
                color="primary"
                size="small"
              >
                Save
              </LoadingButton>
            </div>
          </Tooltip>
        </>
      )}
    </>
  );
  const CancelButton = (
    <>
      {onClose && submitState && (
        <div data-testid="cancelButton">
          <Button
            variant="outlined"
            size="small"
            className="ml-2"
            onClick={onClose}
            disabled={submitState?.loading || loading}
          >
            Close
          </Button>
        </div>
      )}
    </>
  );

  // const isDependantRelationship =
  //   !field?.options?.selectItem && field?.options?.dependentRelationship;
  return (
    <>
      {displayFieldLabel && (
        <>
          {field.fieldType !== 'label' && (
            <Typography
              fontWeight="bold"
              className="d-flex align-items-center"
              data-testid="fields-display"
            >
              <div data-testid="label">{field?.label}</div>
              {authorized && !disabled && showEdit && !inlineEditState?.edit && onClickInlineEdit && (
                <>
                  <Tooltip title="Edit">
                    <IconButton
                      edge="end"
                      onClick={() => {
                        if (onClickInlineEdit) {
                          onClickInlineEdit(field?._id, null, 'editField');
                        }
                      }}
                      size="small"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {(field?.options?.multipleValues || values?.length === 0) && (
                    <Tooltip title="Add New Value">
                      <IconButton
                        edge="end"
                        onClick={() => {
                          if (onClickInlineEdit) {
                            onClickInlineEdit(field?._id, null, 'addValue');
                          }
                        }}
                        size="small"
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Delete Field">
                    <IconButton
                      edge="end"
                      onClick={() => {
                        if (onClickInlineEdit) {
                          onClickInlineEdit(field?._id, null, 'deleteField');
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Typography>
          )}
          {authorized && showEdit && !disabled && inlineEditState && (
            <>
              {inlineEditState?.editMode === 'editField' &&
                inlineEditState?.fieldId === field?._id && (
                  <>
                    <Grid item xs={12}>
                      <InputGroup style={{ display: 'flex' }}>
                        {SubmitButtonComponent}
                        {CancelButton}
                      </InputGroup>
                    </Grid>
                  </>
                )}
            </>
          )}
        </>
      )}
      <div data-testid="value">
        {/* isDependantRelationship ? (
          <DependantResponses disabled={disabled} parentResponseId={response?._id} field={field} />
        ) : */}
        {inlineEditState?.editMode === 'addValue' && submitState && (
          <>
            <Field
              {...fieldProps}
              rules={rules?.[field?._id]}
              field={{
                ...field,
                label: `${field?.label} ${field?.options?.required ? '*' : ''}`,
              }}
              disabled={
                field.options.notEditable
                  ? submitState?.loading || field.options.notEditable
                  : submitState?.loading ||
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
                  : filterValues(response?.values, field)[filterValues(values, field)?.length - 1]
              }
            />
            <Grid item xs={12}>
              <InputGroup style={{ display: 'flex' }}>
                {SubmitButtonComponent}
                {CancelButton}
              </InputGroup>
            </Grid>
          </>
        )}
        {field.fieldType === 'label' ? (
          <DisplayRichText value={field?.options?.staticText} />
        ) : field?.options?.systemCalculatedAndView ? (
          <DisplayFormulaValue
            formula={field?.options?.formula}
            field={field}
            values={response?.values}
          />
        ) : values?.length > 0 ? (
          <>
            {values.map((value, index) => (
              <>
                <Fragment key={value?._id}>
                  {/* <StyledBox style={{ display: 'flex', alignContent: 'center' }}>
                </StyledBox> */}
                  <>
                    {inlineEditState?.editMode === 'editValue' &&
                    inlineEditState?.valueId === value?._id ? (
                      <>
                        <Field
                          {...fieldProps}
                          rules={rules?.[field?._id]}
                          field={{
                            ...field,
                            label: `${field?.label} ${field?.options?.required ? '*' : ''}`,
                          }}
                          disabled={
                            field.options.notEditable
                              ? submitState.loading || field.options.notEditable
                              : submitState.loading ||
                                field.options.systemCalculatedAndView ||
                                (field?.options?.disabled && !enabledFields?.[field?._id])
                          }
                          validate={submitState.validate}
                          onChangeValue={(changedValue) => {
                            if (!field?.options?.systemCalculatedAndView) {
                              onChange({ ...changedValue, field: field._id }, index);
                            }
                          }}
                          value={
                            field.options.systemCalculatedAndView
                              ? {
                                  valueNumber: evaluateFormula(
                                    getFormula(field?.options?.formula?.variables, [], values),
                                  ),
                                }
                              : value
                          }
                        />
                        <Grid item xs={12}>
                          <InputGroup style={{ display: 'flex' }}>
                            {SubmitButtonComponent}
                            {CancelButton}
                          </InputGroup>
                        </Grid>
                      </>
                    ) : (
                      <>
                        {field.options.multipleValues ? (
                          <>
                            {index !== values?.length - 1 && (
                              <>
                                <DisplayValue
                                  field={field}
                                  value={value}
                                  verticalView={verticalView}
                                  onCancel={onClose}
                                  onSubmit={onSubmit}
                                  showEdit={showEdit}
                                  disabled={disabled}
                                  authorized={authorized}
                                  inlineEditState={inlineEditState}
                                  onClickInlineEdit={onClickInlineEdit}
                                />
                                {verticalView && (
                                  <>
                                    {field?.options?.showCommentBox && (
                                      <CommentLikeShare threadId={value?._id} />
                                    )}
                                    {field?.options?.showStarRating && (
                                      <StarRating parentId={value?._id} />
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <DisplayValue
                              field={field}
                              value={value}
                              verticalView={verticalView}
                              onCancel={onClose}
                              onSubmit={onSubmit}
                              showEdit={showEdit}
                              disabled={disabled}
                              authorized={authorized}
                              inlineEditState={inlineEditState}
                              onClickInlineEdit={onClickInlineEdit}
                            />
                            {verticalView && (
                              <>
                                {field?.options?.showCommentBox && (
                                  <CommentLikeShare threadId={value?._id} />
                                )}
                                {field?.options?.showStarRating && (
                                  <StarRating parentId={value?._id} />
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                </Fragment>
              </>
            ))}
          </>
        ) : (
          field?.options?.showAsAddButton && (
            <AddResponseButton
              createCallback={async (newResponse) => {
                await handleCreateUpdateResponse({
                  payload: {
                    ...response,
                    values: [
                      ...response?.values,
                      { value: '', field: field?._id, response: newResponse },
                    ],
                  },
                  edit: true,
                });
              }}
              disabled={disabled}
              field={field}
            />
          )
        )}
      </div>
    </>
  );
}

// const StyledBox = styled(Box)(({ theme }) => ({
//   flexDirection: 'column',
//   [theme.breakpoints.up('md')]: {
//     flexDirection: 'row !important',
//   },
// }));
