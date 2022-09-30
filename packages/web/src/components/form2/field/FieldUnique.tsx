import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import ResponseDrawer from '../../response/ResponseDrawer';

interface FieldUnique {
  uniqueLoading: boolean;
  existingResponseId: boolean;
}

export default function FieldUnique({ uniqueLoading, existingResponseId }: FieldUnique) {
  const [showExistingResponse, setShowExistingResponse] = useState(false);
  if (uniqueLoading) {
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

  if (existingResponseId) {
    return (
      <>
        <span className="text-danger"> must be unique</span>
        <span style={{ cursor: 'pointer' }} onClick={() => setShowExistingResponse(true)}>
          {' '}
          <u>View existing response</u>
        </span>
        {showExistingResponse && (
          <ResponseDrawer
            data-testid="overlay"
            open={showExistingResponse}
            onClose={() => setShowExistingResponse(false)}
            responseId={existingResponseId?.toString()}
          />
        )}
      </>
    );
  }

  return null;
}
