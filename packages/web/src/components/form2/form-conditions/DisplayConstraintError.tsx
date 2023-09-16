import { IField } from '@frontend/shared/types';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { Tooltip } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import ResponseDrawer from '../../response/ResponseDrawer';

interface DisplayConstraintError {
  fieldId: string;
  constraintErrors: { combineFieldId: string; existingResponseId: string }[];
  constraintsLoading: boolean;
  fields: IField[];
}

export default function DisplayConstraintError({
  fieldId,
  constraintErrors,
  constraintsLoading,
  fields,
}: DisplayConstraintError) {
  const [displayExistingResponse, setDisplayExistingResponse] = useState(false);
  const fieldConstraint = constraintErrors?.find((con) => con?.combineFieldId?.includes(fieldId));
  if (fieldConstraint?.combineFieldId) {
    if (constraintsLoading) {
      return (
        <span className="ml-2">
          <CircularProgress size={10} />
          <Tooltip title="Checking if this value is unique">
            <IconButton size="small">
              <InfoOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </span>
      );
    }
    if (fieldConstraint?.existingResponseId) {
      const fieldIds = fieldConstraint?.combineFieldId?.split('-');
      const fieldLabels = [];
      fieldIds?.forEach((fId) => {
        const label = fields?.find((field) => field?._id === fId)?.label;
        if (label) {
          fieldLabels.push(label);
        }
      });
      return (
        <>
          <span className="text-danger"> must be unique between {fieldLabels?.join(', ')}</span>
          <span onClick={() => setDisplayExistingResponse(true)} style={{ cursor: 'pointer' }}>
            {' '}
            <u>View existing response</u>
          </span>
          {displayExistingResponse && (
            <ResponseDrawer
              open={displayExistingResponse}
              onClose={() => setDisplayExistingResponse(false)}
              responseId={fieldConstraint?.existingResponseId}
            />
          )}
        </>
      );
    }
  }
  return null;
}
