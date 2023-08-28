import { getFormBySlug } from '@frontend/shared/hooks/form';
import { getResponse } from '@frontend/shared/hooks/response/getResponse';
import { IForm, IResponse } from '@frontend/shared/types';
import { systemForms } from '@frontend/shared/utils/systemForms';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import ErrorLoading from '../../common/ErrorLoading';
import { DisplayForm } from '../../form2/DisplayForm';

interface IWorkflowStep1 {
  workflowForm: IForm;
  workflowResponse: IResponse;
}

export default function WorkflowStep1({ workflowForm, workflowResponse }: IWorkflowStep1) {
  const [workflow, setWorkflow] = useState<any>({});

  const getStep1 = async () => {
    const step1Field = workflowForm?.fields?.find(
      (field) =>
        field?.label?.toLocaleLowerCase() ===
        systemForms?.workflow?.fields?.step1?.toLocaleLowerCase(),
    );
    const step1FieldValue = workflowResponse?.values?.find(
      (value) => value?.field === step1Field?._id,
    );
    const step1ResponseId = step1FieldValue?.response?._id;
    const stepForm = await getFormBySlug(systemForms?.workflowSteps?.slug);
    const step1Response = await getResponse(step1ResponseId);
    const { stepName, stepFormId } = getStepObject(stepForm, step1Response);
    setWorkflow((oldWorkflow) => ({ ...oldWorkflow, step1: { stepFormId, stepName } }));
  };

  useEffect(() => {
    getStep1();
  }, []);

  return (
    <Paper variant="outlined" className="p-2">
      {workflowResponse?._id ? (
        <DisplayForm
          workflowId={workflowResponse?._id}
          _id={workflow?.step1?.stepFormId}
          settings={{ formView: 'button', buttonLabel: workflow?.step1?.stepName }}
        />
      ) : (
        <ErrorLoading />
      )}
    </Paper>
  );
}

export const getStepObject = (stepForm, stepResponse) => {
  const stepFormFormField = stepForm?.fields?.find(
    (field) => field?.label?.toLowerCase() === systemForms?.workflowSteps?.fields?.stepForm,
  );
  const stepFormStepNameField = stepForm?.fields?.find(
    (field) => field?.label?.toLowerCase() === systemForms?.workflowSteps?.fields?.stepName,
  );
  const stepFormId = stepResponse?.values?.find((value) => value?.field === stepFormFormField?._id)
    ?.form?._id;
  const stepName = stepResponse?.values?.find(
    (value) => value?.field === stepFormStepNameField?._id,
  )?.value;
  return { stepName, stepFormId };
};
