import { IField, IResponse } from '@frontend/shared/types';
import Box from '@mui/material/Box';
import React, { Fragment, useEffect, useState } from 'react';
import { useResolveCondition } from '@frontend/shared/hooks/response';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CommentLikeShare from '../comment/CommentLikeShare';
import DisplayRichText from '../common/DisplayRichText';
import DisplayValue from '../form2/DisplayValue';
import DisplayFormulaValue from '../form2/field/formula/DisplayFormulaValue';
import StarRating from '../starRating/starRating';
import AddResponseButton from './AddResponseButton';

interface IFieldValuesMap {
  field: IField;
  response: IResponse;
  verticalView?: boolean;
  authorized?: boolean;
  displayFieldLabel?: boolean;
  onClickEditField?: (fieldId: string) => void;
}

export default function FieldValuesMap({
  field,
  response,
  verticalView,
  authorized,
  displayFieldLabel,
  onClickEditField,
}: IFieldValuesMap) {
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

  useEffect(() => {
    checkDisabledCondition();
  }, [response]);

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
                <Tooltip title="Edit">
                  <IconButton
                    edge="end"
                    onClick={() => {
                      if (onClickEditField) {
                        onClickEditField(field?._id);
                      }
                    }}
                    size="small"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
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
            {fieldValues.map((value) => (
              <Fragment key={value?._id}>
                <StyledBox style={{ display: 'flex', alignContent: 'center' }}>
                  <DisplayValue field={field} value={value} verticalView={verticalView} />
                </StyledBox>
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
            <AddResponseButton disabled={disabled} field={field} response={response} />
          )
        )}
      </div>
    </>
  );
}

const StyledBox = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row !important',
  },
}));