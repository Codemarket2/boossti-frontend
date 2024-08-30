import { IForm } from '@frontend/shared/types';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { useGetForm } from '@frontend/shared/hooks/form';
import { FieldTypeEnum } from '../fieldTypes';
import ResponseList from '../../response/ResponseList';
import ErrorLoading from '../../common/ErrorLoading';

export default function ParentFormResponsesDisplay({ form }: { form: IForm }) {
  const router = useRouter();

  const field = useMemo(() => {
    return form?.fields?.find((field) => field?.fieldType === FieldTypeEnum.FormResponseDisplay);
  }, [form]);
  const { data, error } = useGetForm(field?.form?._id);

  if (!data?.getForm?._id || error) {
    return <ErrorLoading error={error} />;
  }

  return (
    <div>
      {data?.getForm?._id && (
        <ResponseList
          form={data?.getForm}
          onClickResponse={(parentResponse, parentForm) => {
            router.push(`/form/${parentForm.slug}/response/${parentResponse.count}/${form?.slug}`);
          }}
        />
      )}
    </div>
  );
}
