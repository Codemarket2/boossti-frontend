import { useUpdateTemplate } from '@frontend/shared/hooks/template';
import Paper from '@mui/material/Paper';
import React from 'react';
import { onAlert } from '../../utils/alert';
import FormFieldsValue from '../form2/FormFieldsValue';

interface IProps {
  template: any;
}

export default function TemplatePreview2({ template }: IProps) {
  const { onTemplateChange } = useUpdateTemplate({
    template,
    onAlert,
  });
  return (
    <>
      <Paper variant="outlined">
        <FormFieldsValue
          authorized
          fields={template?.fields}
          values={[]}
          handleValueChange={() => null}
          pageId={template?._id}
          layouts={template?.options?.layouts || {}}
          disableGrid={false}
          onLayoutChange={(layouts) => {
            onTemplateChange({
              options: { ...template?.options, layouts },
            });
          }}
        />
      </Paper>
    </>
  );
}
