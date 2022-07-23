import { useGetForm, useUpdateForm } from '@frontend/shared/hooks/form';
import { defaultOptions } from '@frontend/shared/hooks/form/addFields';
import { IField } from '@frontend/shared/types';
import { generateObjectId } from '@frontend/shared/utils/objectId';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { onAlert } from '../../../utils/alert';
import ErrorLoading from '../../common/ErrorLoading';
import { DisplayForm } from '../DisplayForm';

interface TabViewProps {
  formId: string;
  tab: IField;
}

export default function TabView({ formId, tab }: TabViewProps) {
  const { data, error, refetch } = useGetForm(tab?.form?._id);
  const { handleUpdateForm, updateLoading } = useUpdateForm({ onAlert, form: data?.getForm });
  const [loading, setLoading] = useState(false);
  const [field, setField] = useState<IField>(null);

  const addField = async () => {
    setLoading(true);
    let fields = data?.getForm?.fields;
    const newField: IField = {
      _id: generateObjectId(),
      label: 'Form',
      fieldType: 'form',
      options: { ...defaultOptions, tabField: true },
    };
    fields = [...fields, newField];
    const updatedForm = await handleUpdateForm({ ...data?.getForm, fields });
    if (updatedForm?._id) {
      await refetch();
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data?.getForm?._id) {
      const tempField = data?.getForm?.fields?.find(
        (f) =>
          f?.fieldType === 'form' && (f?.label?.toLowerCase() === 'form' || f?.options?.tabField),
      );
      if (tempField?._id) {
        setField(tempField);
      } else {
        setField(null);
        if (!loading) {
          addField();
        }
      }
    }
  }, [data?.getForm]);

  return (
    <Paper variant="outlined" className="p-2">
      {!data || error || updateLoading || loading ? (
        <ErrorLoading error={error} />
      ) : data?.getForm?._id && field?._id ? (
        <DisplayForm
          _id={data?.getForm?._id}
          settings={{ formView: 'button', buttonLabel: `Add ${tab?.label}` }}
          overrideValues={[{ field: field?._id, form: { _id: formId } }]}
        />
      ) : (
        <ErrorLoading
          error={{
            message: data?.getForm?._id ? `Please wait loading the tab...` : 'Form not found',
          }}
        />
      )}
    </Paper>
  );
}
