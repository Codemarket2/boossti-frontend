import { Card } from '@mui/material';
import React from 'react';
import slugify from 'slugify';
import { FormPage } from '../form2/FormPage';

interface IProps {
  template: any;
}

export default function TemplateIntances({ template }: IProps) {
  const slug = slugify(template?.fields?.[0]?.form?.name, { lower: true });
  return (
    <Card variant="outlined" className="p-2">
      <FormPage
        slug={slug}
        settings={{
          formView: 'button',
          onlyMyResponses: true,
          buttonLabel: `Create ${template?.title}`,
        }}
        templateId={template?._id}
      />
    </Card>
  );
}
