import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import { systemForms } from '@frontend/shared/utils/systemForms';
import React from 'react';
import ErrorLoading from '../../common/ErrorLoading';
import { DisplayForm } from '../DisplayForm';

interface IRule {
  formId: string;
  fieldId: string;
}

export default function Rules({ formId, fieldId }: IRule) {
  const { data, error } = useGetFormBySlug(systemForms?.rules?.slug);

  const rulesFormField = data?.getFormBySlug?.fields?.find(
    (field) => field?.label?.toLowerCase() === systemForms?.rules?.fields?.field?.toLowerCase(),
  );

  if (error) {
    return <ErrorLoading />;
  }

  return (
    <div className="mb-4">
      <DisplayForm
        slug="rules"
        settings={{ formView: 'button' }}
        overrideValues={[
          {
            field: rulesFormField?._id,
            form: { _id: formId },
            options: { subField: { formId, fieldId } },
          },
        ]}
        valueFilter={{
          'values.field': rulesFormField?._id,
          'values.form': formId,
          'values.options.subField.fieldId': fieldId,
        }}
      />
    </div>
  );
}
