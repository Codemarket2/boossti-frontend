import { IField, IResponse, IForm } from '@frontend/shared/types';
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
import CommentLikeShare from '../comment/CommentLikeShare';
import DisplayRichText from '../common/DisplayRichText';
import DisplayValue from '../form2/DisplayValue';
import DisplayFormulaValue from '../form2/field/formula/DisplayFormulaValue';
import StarRating from '../starRating/starRating';
import AddResponseButton from './AddResponseButton';

// import DependantResponses from './DependantResponses';
import { onAlert } from '../../utils/alert';

interface IFieldValuesMap {
  field: IField;
  response: IResponse;
  verticalView?: boolean;
  authorized?: boolean;
  displayFieldLabel?: boolean;
  showEdit?: boolean;
  onClickEditField?: (fieldId: string, valueId: string, editMode: string) => void;
  form: IForm;
  inlineEdit?: boolean;
}

export default function FieldValuesMap({
  field,
  response,
  showEdit = true,
  verticalView,
  authorized,
  displayFieldLabel,
  onClickEditField,
  form,
  inlineEdit = false,
}: IFieldValuesMap) {
  const { handleCreateUpdateResponse } = useCreateUpdateResponse({ onAlert });
  // const fieldValues = response?.values?.filter((v) => v.field === field._id);
  const [fieldValues, setFieldValues] = useState(
    response?.values?.filter((v) => v.field === field._id),
  );
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

  const removeFieldValue = async (valueId: string) => {
    const oldValues = Array.from(fieldValues);
    const newValues = oldValues.filter((value) => value?._id !== valueId);
    const payload = {
      newValues,
      _id: response?._id,
    };
    const updatedResponse = await handleCreateUpdateResponse({
      payload,
      edit: true,
      fields: form?.fields,
    });
    setFieldValues(updatedResponse?.values?.filter((value) => value?.field === field?._id));
  };

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
              {authorized && !disabled && showEdit && (
                <>
                  <Tooltip title="Edit">
                    <IconButton
                      edge="end"
                      onClick={() => {
                        if (onClickEditField) {
                          onClickEditField(field?._id, null, 'editField');
                        }
                      }}
                      size="small"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {field?.options?.multipleValues && (
                    <Tooltip title="Add New Value">
                      <IconButton
                        edge="end"
                        onClick={() => {
                          if (onClickEditField) {
                            onClickEditField(field?._id, null, 'addValue');
                          }
                        }}
                        size="small"
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </>
              )}
            </Typography>
          )}
        </>
      )}
      <div data-testid="value">
        {/* isDependantRelationship ? (
          <DependantResponses disabled={disabled} parentResponseId={response?._id} field={field} />
        ) : */}
        {field.fieldType === 'label' ? (
          <DisplayRichText value={field?.options?.staticText} />
        ) : field?.options?.systemCalculatedAndView ? (
          <DisplayFormulaValue
            formula={field?.options?.formula}
            field={field}
            values={response?.values}
          />
        ) : fieldValues?.length > 0 ? (
          <>
            {fieldValues.map((value) => (
              <Fragment key={value?._id}>
                {/* <StyledBox style={{ display: 'flex', alignContent: 'center' }}>
                </StyledBox> */}
                {field.options.multipleValues && value.value !== '' ? (
                  <>
                    <Typography className="d-flex align-items-center" data-testid="fields-display">
                      {authorized && !disabled && showEdit && (
                        <Tooltip title="Edit">
                          <IconButton
                            edge="end"
                            onClick={() => {
                              if (onClickEditField) {
                                onClickEditField(field?._id, value?._id, 'editValue');
                              }
                            }}
                            size="small"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Typography>
                    {/* {!inlineEdit && !value?.options?.defaultWidget &&  (
                      <Tooltip title="Delete Value">
                        <IconButton
                          edge="end"
                          onClick={() => removeFieldValue(value?._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    )} */}
                    <DisplayValue field={field} value={value} verticalView={verticalView} />
                  </>
                ) : (
                  <DisplayValue field={field} value={value} verticalView={verticalView} />
                )}
                {verticalView && (
                  <>
                    {field?.options?.showCommentBox && <CommentLikeShare threadId={value?._id} />}
                    {field?.options?.showStarRating && <StarRating parentId={value?._id} />}
                  </>
                )}
              </Fragment>
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
