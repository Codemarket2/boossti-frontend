import React, { Fragment, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useCreateUpdateResponse, useResolveCondition } from '@frontend/shared/hooks/response';
import { useDebounce } from '@frontend/shared/hooks/condition/debounce';
import { IField, IResponse } from '@frontend/shared/types';
import InlineEditMenu from './InlineEditMenu';
import DisplayValue from '../form2/DisplayValue';
import CommentLikeShare from '../comment/CommentLikeShare';
import StarRating from '../starRating/starRating';
import AddResponseButton from './AddResponseButton';
import DisplayRichText from '../common/DisplayRichText';
import DisplayFormulaValue from '../form2/field/formula/DisplayFormulaValue';
import FormGrid from '../../../pages/ReactGridLayout/ReactGridLayout';
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

export default function FieldValuesMap({
  field,
  response,
  verticalView,
  authorized,
  displayFieldLabel,
  onClickEditField,
  inlineEdit = false,
}: IFieldValuesMap) {
  const { handleCreateUpdateResponse } = useCreateUpdateResponse({ onAlert });
  const { handleResolveCondition } = useResolveCondition();
  const fieldValues = response?.values?.filter((v) => v.field === field._id);
  const [disabled, setDisabled] = useState(false || field?.options?.disabled);
  const [state, setState] = useState({ inlineEditViewMore: false });
  let parsedObject;
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
  // console.log(response, 'rr');
  // console.log(field._id, 'ff');
  if (field.fieldType === 'reactgridlayouteditor') {
    // const targetFieldId = '659492a4bd709f686705cd37';
    // const targetFieldId = '659645e5beda496d723f780a';
    // const targetFieldId = '65966fb4c6d011032775daf9';
    const targetFieldId = field._id;
    // console.log(response, 'resres');
    // console.log(field._id, 'ff');
    const targetValue = response?.values?.find((value) => value.field === targetFieldId);

    // console.log(targetValue.value, 'targetValue Check');
    const Object = targetValue?.value;
    // // parsedObject = parsedObject.substring(1,parsedObject.length - 1)
    // if (targetValue !== undefined) {
    //   while (typeof parsedObject !== 'object') {
    // parsedObject = JSON.parse(parsedObject);
    //   }
    // }
    // console.log(Object, 'Target Chilfgfdcc');
    parsedObject = JSON.parse(Object);
    // console.log(parsedObject, 'parsedObject');
  }
  return (
    <>
      {displayFieldLabel && (
        <>
          {field.fieldType !== 'reactgridlayouteditor' && (
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
        {field.fieldType === 'reactgridlayouteditor' ? (
          <div>
            <p>ReactGridLayoutEditor</p>
            {/* <p>hiyfhfghi</p> */}
            <FormGrid value={parsedObject.lg} onChange={null} />
            {/* <FormGrid value={null} onChange={null} /> */}

            <DisplayRichText value={field?.options?.staticText} />
          </div>
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
                      <div key={value?._id}>
                        <>
                          {authorized && !disabled && !inlineEdit && (
                            <InlineEditMenu
                              item="value"
                              field={field}
                              valueId={value?._id}
                              fieldId={field?._id}
                              onClickEditField={onClickEditField}
                            />
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
                        </>
                      </div>
                    )}
                  </>
                ) : (
                  <div key={value?._id}>
                    <>
                      {authorized && !disabled && !inlineEdit && (
                        <InlineEditMenu
                          item="value"
                          field={field}
                          valueId={value?._id}
                          fieldId={field?._id}
                          onClickEditField={onClickEditField}
                        />
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
                    </>
                  </div>
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
