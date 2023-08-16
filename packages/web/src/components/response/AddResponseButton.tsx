import { useCheckPermission } from '@frontend/shared/hooks/permission';
import { IField } from '@frontend/shared/types';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import ErrorLoading from '../common/ErrorLoading';
import CreateResponseDrawer from './CreateResponseDrawer';

interface IAddResponseButton {
  field: IField;
  disabled?: boolean;
  parentResponseId?: string;
  createCallback?: (newResponse: any) => void;
}

export default function AddResponseButton({
  field,
  disabled,
  parentResponseId,
  createCallback,
}: IAddResponseButton) {
  const [showDrawer, setShowDrawer] = useState(false);
  const { hasPermission, error } = useCheckPermission({
    actionType: 'CREATE',
    formId: field?.form?._id,
  });

  // if (error) {
  //   return <ErrorLoading error={error} />;
  // }

  if (hasPermission) {
    return (
      <div>
        <div data-testid="responseModal">
          {field?.form?._id && showDrawer && (
            <CreateResponseDrawer
              open={showDrawer}
              onClose={() => setShowDrawer(false)}
              title={field?.label}
              formId={field?.form?._id}
              parentResponseId={parentResponseId}
              createCallback={(newResponse) => {
                if (createCallback) {
                  createCallback(newResponse);
                } else {
                  setShowDrawer(false);
                }
              }}
            />
          )}
        </div>
        <Button
          disabled={disabled}
          size="small"
          color="primary"
          onClick={() => setShowDrawer(true)}
        >
          Add {field?.label || 'Response'}
        </Button>
      </div>
    );
  }

  return null;
}
