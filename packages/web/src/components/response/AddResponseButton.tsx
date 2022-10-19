import { useCreateUpdateResponse } from '@frontend/shared/hooks/response';
import { IField, IResponse } from '@frontend/shared/types';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { onAlert } from '../../utils/alert';
import CreateResponseDrawer from './CreateResponseDrawer';

interface IAddResponseButton {
  field: IField;
  response: IResponse;
  disabled?: boolean;
}

export default function AddResponseButton({ field, response, disabled }: IAddResponseButton) {
  const [showDrawer, setShowDrawer] = useState(false);
  const { handleCreateUpdateResponse } = useCreateUpdateResponse({ onAlert });

  return (
    <div>
      <div data-testid="responseModal">
        {field?.form?._id && showDrawer && (
          <CreateResponseDrawer
            open={showDrawer}
            onClose={() => setShowDrawer(false)}
            title={field?.label}
            formId={field?.form?._id}
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
              setShowDrawer(false);
            }}
          />
        )}
      </div>
      <Button disabled={disabled} size="small" color="primary" onClick={() => setShowDrawer(true)}>
        Add {field?.label || 'Response'}
      </Button>
    </div>
  );
}
