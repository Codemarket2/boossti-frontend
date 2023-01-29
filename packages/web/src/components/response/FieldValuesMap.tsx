import { IField, IResponse } from '@frontend/shared/types';
// import Box from '@mui/material/Box';
import React, { Fragment, useState } from 'react';
import { useCreateUpdateResponse, useResolveCondition } from '@frontend/shared/hooks/response';
import { useDebounce } from '@frontend/shared/hooks/condition/debounce';
// import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentLikeShare from '../comment/CommentLikeShare';
import DisplayRichText from '../common/DisplayRichText';
import DisplayValue from '../form2/DisplayValue';
import DisplayFormulaValue from '../form2/field/formula/DisplayFormulaValue';
import StarRating from '../starRating/starRating';
import AddResponseButton from './AddResponseButton';
// import DependantResponses from './DependantResponses';
import { onAlert } from '../../utils/alert';

// changes for the inlineEdit

interface IFieldValuesMap {
  field: IField;
  response: IResponse;
  verticalView?: boolean;
  authorized?: boolean;
  displayFieldLabel?: boolean;
  onClickEditField?: (fieldId: string, valueId: string, editMode: string) => void;
}

export default function FieldValuesMap({
  field,
  response,
  verticalView,
  authorized,
  displayFieldLabel,
  onClickEditField,
}: IFieldValuesMap) {
  const { handleCreateUpdateResponse } = useCreateUpdateResponse({ onAlert });
  const fieldValues = response?.values?.filter((v) => v.field === field._id);
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
              {authorized && !disabled && (
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
                  {(field?.options?.multipleValues ? true : fieldValues.length === 0) && (
                    <>
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
                    </>
                  )}
                  <Tooltip title="Delete Field">
                    <IconButton
                      edge="end"
                      onClick={() => {
                        if (onClickEditField) {
                          onClickEditField(field?._id, null, 'deleteField');
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
            {fieldValues.map((value, index) => (
              <>
                {field?.options?.multipleValues ? (
                  <>
                    {index !== fieldValues?.length - 1 && (
                      <>
                        {authorized && !disabled && (
                          <>
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
                            <Tooltip title="Delete Value">
                              <IconButton
                                edge="end"
                                onClick={() => {
                                  if (onClickEditField) {
                                    onClickEditField(field?._id, value?._id, 'deleteValue');
                                  }
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                        <Fragment key={value?._id}>
                          {/* <StyledBox style={{ display: 'flex', alignContent: 'center' }}>
                </StyledBox> */}
                          <DisplayValue field={field} value={value} verticalView={verticalView} />
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
                        </Fragment>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {authorized && !disabled && (
                      <>
                        {/* <Tooltip title="Edit">
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
                        </Tooltip> */}
                        <Tooltip title="Delete Field">
                          <IconButton
                            edge="end"
                            onClick={() => {
                              if (onClickEditField) {
                                onClickEditField(field?._id, value?._id, 'deleteValue');
                              }
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                    <Fragment key={value?._id}>
                      {/* <StyledBox style={{ display: 'flex', alignContent: 'center' }}>
                </StyledBox> */}
                      <DisplayValue field={field} value={value} verticalView={verticalView} />
                      {verticalView && (
                        <>
                          {field?.options?.showCommentBox && (
                            <CommentLikeShare threadId={value?._id} />
                          )}
                          {field?.options?.showStarRating && <StarRating parentId={value?._id} />}
                        </>
                      )}
                    </Fragment>
                  </>
                )}
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
