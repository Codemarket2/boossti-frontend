import { useGetFormRelations } from '@frontend/shared/hooks/form/getForm';
import { Divider, Typography } from '@mui/material';
import React from 'react';
import ErrorLoading from '../common/ErrorLoading';
import { DisplayForm } from './DisplayForm';

interface RelationFieldView {
  formId: string;
  responseId: string;
}

export default function RelationFieldView({ formId, responseId }: RelationFieldView) {
  const { data, error } = useGetFormRelations(formId);

  if (!data || error) {
    return <ErrorLoading error={error} />;
  }

  return (
    <div>
      {data?.getFormRelations?.length > 0 && (
        <>
          <Divider className="mt-4" />
          <Typography variant="h5" className="p-2">
            Relations
          </Typography>
        </>
      )}
      {data?.getFormRelations?.map((relationForm) => {
        const field = relationForm?.fields?.find(
          (relationField) =>
            relationField?.form?._id === formId && relationField?.options?.twoWayRelationship,
        );
        return (
          <div key={relationForm?._id}>
            {field && (
              <div className="p-2">
                <Typography fontWeight="bold">
                  {field?.options?.relationLabel || relationForm?.name}
                </Typography>
                <DisplayForm
                  _id={relationForm?._id}
                  settings={{
                    widgetType: 'responses',
                    formView: 'button',
                    responsesView: 'table',
                    buttonLabel: `Add ${field?.options?.relationLabel || relationForm?.name}`,
                  }}
                  valueFilter={{ 'values.field': field?._id, 'values.response': responseId }}
                  overrideValues={[{ field: field?._id, response: { _id: responseId } }]}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
