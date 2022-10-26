import { useGetResponses } from '@frontend/shared/hooks/response';
import { IField } from '@frontend/shared/types';
import React from 'react';
import ErrorLoading from '../common/ErrorLoading';
import AddResponseButton from './AddResponseButton';
import { ShowResponseLabel } from './ResponseDrawer';

interface IDependantResponse {
  parentResponseId: string;
  field: IField;
  disabled?: boolean;
}

export default function DependantResponses({
  parentResponseId,
  field,
  disabled,
}: IDependantResponse) {
  const limit = field?.options?.multipleValues ? undefined : 1;

  const { data, error, refetch } = useGetResponses({
    formId: field?.form?._id,
    parentResponseId,
    limit,
  });

  if (!data) {
    return <>Loading...</>;
  }

  if (error) {
    return <ErrorLoading error={error} />;
  }

  const showAddButton = !(data?.getResponses?.data?.length > 0) || field?.options?.multipleValues;

  return (
    <div>
      {showAddButton && (
        <AddResponseButton
          disabled={disabled}
          field={field}
          parentResponseId={parentResponseId}
          createCallback={refetch}
        />
      )}
      {data?.getResponses?.data?.map((response) => (
        <ShowResponseLabel
          key={response?._id}
          formId={field?.form?._id}
          formField={field.options?.formField}
          response={response}
        />
      ))}
    </div>
  );
}
