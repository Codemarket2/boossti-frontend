import { useGetForm } from '@frontend/shared/hooks/form';
import { useGetResponses } from '@frontend/shared/hooks/response';
import { IField, IResponse } from '@frontend/shared/types';
import { Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import React from 'react';
import { DisplayForm } from '../../form2/DisplayForm';
import { ShowResponseLabel } from '../ResponseDrawer';

interface IWorkflowButton {
  response: IResponse;
  tableCellView?: boolean;
}

export default function WorkflowButtons({ response, tableCellView }: IWorkflowButton) {
  const { data } = useGetForm(response?.workflowId);

  if (data?.getForm?.fields?.length > 0) {
    return (
      <>
        {data?.getForm?.fields
          ?.filter((field) => field?.form?._id !== response?.formId)
          ?.map((field) => (
            <Item
              key={field?._id}
              field={field}
              workflowId={response?.workflowId}
              parentResponseId={response?._id}
              tableCellView={tableCellView}
            />
          ))}
      </>
    );
  }

  return null;
}

const Item = ({
  workflowId,
  field,
  parentResponseId,
  tableCellView,
}: {
  field: IField;
  workflowId: string;
  parentResponseId: string;
  tableCellView?: boolean;
}) => {
  const { data } = useGetResponses({ formId: field?.form?._id, workflowId, parentResponseId });

  const Component = (
    <>
      <Typography fontWeight="bold">{field?.label}</Typography>
      {data?.getResponses?.data?.[0]?._id ? (
        <>
          <ShowResponseLabel
            formId={field?.form?._id}
            formField={field.options?.formField}
            response={data?.getResponses?.data?.[0]}
          />
        </>
      ) : (
        <>
          <DisplayForm
            workflowId={workflowId}
            parentResponseId={parentResponseId}
            _id={field?.form?._id}
            settings={{ formView: 'button', widgetType: 'form' }}
          />
        </>
      )}
    </>
  );

  if (tableCellView) {
    return <TableCell>{Component}</TableCell>;
  }

  return <div className="mt-4">{Component}</div>;
};
