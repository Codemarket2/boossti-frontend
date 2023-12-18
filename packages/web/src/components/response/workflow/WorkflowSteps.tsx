import { getFormBySlug, useGetFormBySlug } from '@frontend/shared/hooks/form';
import { useGetResponse } from '@frontend/shared/hooks/response';
import { getResponses } from '@frontend/shared/hooks/response/getResponse';
import { IField } from '@frontend/shared/types';
import { systemForms } from '@frontend/shared/utils/systemForms';
import React, { useEffect, useState } from 'react';
import { DisplayForm } from '../../form2/DisplayForm';
import { getStepObject } from './WorkflowStep1';

interface WorkflowSteps {
  workflowId: string;
  parentResponseId: string;
}

export default function WorkflowSteps({ workflowId, parentResponseId }: WorkflowSteps) {
  const { data } = useGetFormBySlug(systemForms?.workflow?.slug);
  const { data: responseData } = useGetResponse(workflowId);
  const [steps, setSteps] = useState([]);

  const getSteps = async () => {
    const workflowResponse = responseData?.getResponse;
    const workflowForm = data?.getFormBySlug;
    const workflowFormStepsField = getFormFieldByLabel(
      workflowForm?.fields,
      systemForms?.workflow?.fields?.steps,
    );
    const responses = await getResponses({
      formId: workflowFormStepsField?.form?._id,
      valueFilter: JSON.stringify({ parentResponseId: workflowResponse?._id }),
    });
    const stepForm = await getFormBySlug(systemForms?.workflowSteps?.slug);
    const tempSteps = [];
    responses?.data?.forEach((stepResponse) => {
      const stepObj = getStepObject(stepForm, stepResponse);
      tempSteps?.push(stepObj);
    });
    setSteps(tempSteps);
  };

  useEffect(() => {
    if (responseData?.getResponse?._id && data?.getFormBySlug?._id) {
      getSteps();
    }
  }, [responseData?.getResponse, data?.getFormBySlug]);

  return (
    <div className="p-2">
      {steps?.map((step, i) => (
        <div key={i} className="mt-5">
          <DisplayForm
            parentResponseId={parentResponseId}
            _id={step.stepFormId}
            settings={{ formView: 'button', buttonLabel: step?.stepName }}
          />
        </div>
      ))}
    </div>
  );
}

const getFormFieldByLabel = (fields: IField[], label: string) => {
  return fields?.find((field) => field?.label?.toLowerCase() === label?.toLowerCase());
};
