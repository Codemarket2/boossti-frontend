import { IForm, IResponse } from '@frontend/shared/types';
import { Typography } from '@mui/material';
import React from 'react';
import { DisplayForm } from '../../form2/DisplayForm';

interface IWorkflow {
  workflowForm: IForm;
  response: IResponse;
}

export default function Workflow({ workflowForm, response }: IWorkflow) {
  return (
    <div>
      {workflowForm?.fields
        ?.filter((field) => field?.form?._id !== response?.formId)
        ?.map((field) => (
          <div key={field?._id} className="mt-4">
            <Typography fontWeight="bold">{field?.label}</Typography>
            <DisplayForm
              _id={field?.form?._id}
              settings={{ formView: 'button' }}
              workflowId={workflowForm?._id}
              parentResponseId={response?._id}
            />
          </div>
        ))}
    </div>
  );
}
