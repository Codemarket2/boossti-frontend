import { useGetForm } from '@frontend/shared/hooks/form';
import { useGetResponse } from '@frontend/shared/hooks/response';
import { IField } from '@frontend/shared/types';
import ErrorLoading from '../common/ErrorLoading';
import DisplayValue from '../form2/DisplayValue';

interface IDisplayResponseValueWrapper {
  formId: string;
  fieldId: string;
  responseId: string;
  onClickResponse: () => void;
}

export default function DisplayResponseValueWrapper({
  formId,
  fieldId,
  responseId,
  onClickResponse,
}: IDisplayResponseValueWrapper) {
  const { data, error } = useGetForm(formId);

  const field = data?.getForm?.fields?.find(
    (f) => f?._id === fieldId && f?.fieldType === 'response',
  );

  if (error) {
    return <ErrorLoading error={error} />;
  }

  return (
    <>
      {field?._id && (
        <DisplayResponseValue
          field={field}
          responseId={responseId}
          onClickResponse={onClickResponse}
        />
      )}
    </>
  );
}

interface DisplayResponseValue {
  field: IField;
  responseId: string;
  onClickResponse: () => void;
}

export function DisplayResponseValue({ field, responseId, onClickResponse }: DisplayResponseValue) {
  const { data, error } = useGetResponse(responseId);

  if (error) {
    return <ErrorLoading error={error} />;
  }

  return (
    <>
      {data?.getResponse?.values
        ?.filter((value) => value?.field === field?._id)
        ?.map((value) => (
          <DisplayValue
            key={value?._id}
            field={field}
            value={value}
            onClickResponse={onClickResponse}
          />
        ))}
    </>
  );
}
