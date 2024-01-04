import React, { Fragment, useState } from 'react';
import { useCreateUpdateResponse, useResolveCondition } from '@frontend/shared/hooks/response';
import { useDebounce } from '@frontend/shared/hooks/condition/debounce';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IField, IResponse, IFieldOptions } from '@frontend/shared/types';
import CommentLikeShare from '../comment/CommentLikeShare';
import DisplayRichText from '../common/DisplayRichText';
import DisplayValue from '../form2/DisplayValue';
import DisplayFormulaValue from '../form2/field/formula/DisplayFormulaValue';
import StarRating from '../starRating/starRating';
import AddResponseButton from './AddResponseButton';
import InlineEditMenu from './InlineEditMenu';
import { onAlert } from '../../utils/alert';

interface IFieldValuesMap {
  field: IField;
  response: IResponse;
  verticalView?: boolean;
  authorized?: boolean;
  displayFieldLabel?: boolean;
  onClickEditField?: (fieldId: string, valueId: string, editMode: string) => void;
  inlineEdit?: boolean;
}

export default function FieldTitleMap({
  field,
  response,
  verticalView,
  authorized,
  displayFieldLabel,
  onClickEditField,
  inlineEdit = false,
}: IFieldValuesMap) {
  const { handleCreateUpdateResponse } = useCreateUpdateResponse({ onAlert });
  const fieldValues = response?.values?.filter((v) => v.field === field._id);
  const [disabled, setDisabled] = useState(false || field?.options?.disabled);
  const { handleResolveCondition } = useResolveCondition();
  const [state, setState] = useState({ inlineEditViewMore: false });
  // console.log(field, 'field vallues');
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
                  {(field?.options?.multipleValues || fieldValues?.length === 0) && !inlineEdit && (
                    <InlineEditMenu
                      item="field"
                      field={field}
                      valueId={null}
                      fieldId={field?._id}
                      onClickEditField={onClickEditField}
                    />
                  )}
                </>
              )}
            </Typography>
          )}
        </>
      )}
      <div data-testid="value">
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
                      <div>
                        <Fragment key={value?._id}>
                          {authorized && !disabled && !inlineEdit && (
                            <>
                              <InlineEditMenu
                                item="value"
                                field={field}
                                valueId={value?._id}
                                fieldId={field?._id}
                                onClickEditField={onClickEditField}
                              />
                            </>
                          )}
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
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <Fragment key={value?._id}>
                      {authorized && !disabled && !inlineEdit && (
                        <div>
                          <InlineEditMenu
                            item="value"
                            field={field}
                            valueId={value?._id}
                            fieldId={field?._id}
                            onClickEditField={onClickEditField}
                          />
                        </div>
                      )}
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
