import { useUpdateSection } from '@frontend/shared/hooks/section';
import { IResponse } from '@frontend/shared/types';
import TableCell from '@mui/material/TableCell';
import React from 'react';
import { onAlert } from '../../../utils/alert';
import { DisplayForm } from '../../form2/DisplayForm';

interface IWorkflowButton {
  response: IResponse;
}

export default function WorkflowButtons({ response }: IWorkflowButton) {
  const { section } = useUpdateSection({
    onAlert,
    _id:
      (typeof response?.options === 'string' ? JSON.parse(response?.options) : response?.options)
        ?.customSectionId || response?.formId,
  });

  if (section?.fields?.length > 0) {
    return (
      <TableCell>
        {section?.fields?.map((workflow) => (
          <div>
            <DisplayForm
              workFlowFormResponseParentId={response?._id}
              _id={workflow?.form?._id}
              settings={{ formView: 'button', widgetType: 'form' }}
            />
          </div>
        ))}
      </TableCell>
    );
  }

  return null;
}
