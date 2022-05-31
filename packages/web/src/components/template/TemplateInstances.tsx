import { Card } from '@mui/material';
import React from 'react';
import slugify from 'slugify';
import { FormPage } from '../form2/FormPage';

interface IProps {
  template: any;
}

export default function TemplateIntances({ template }: IProps) {
  const defaultWidget = template?.fields?.[0];
  const slug = slugify(defaultWidget?.form?.name, { lower: true });
  let customSettings = {};
  if (defaultWidget?.options?.settings?.active) {
    customSettings = { ...defaultWidget?.options?.settings };
  }

  return (
    <Card variant="outlined" className="p-2">
      <FormPage
        slug={slug}
        settings={{
          ...customSettings,
          widgetType: 'both',
          formView: 'button',
          onlyMyResponses: true,
          buttonLabel: `Create ${template?.title}`,
          responsesView: 'table',
        }}
        templateId={template?._id}
        isTemplateInstance={template?.slug}
      />
    </Card>
  );
}
