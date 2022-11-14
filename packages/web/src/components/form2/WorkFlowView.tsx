import { IField, IForm } from '@frontend/shared/types';
import { Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DisplayForm } from './DisplayForm';
import FormFields from './FormFields';
import FormView from './FormView';

interface IWorkflowView {
  form: IForm;
}

export default function WorkflowView({ form }: IWorkflowView) {
  const [field, setField] = useState<IField>(null);
  useEffect(() => {
    if (!field && form?.fields?.length > 0) {
      setField(form?.fields?.[0]);
    }
  }, [form?.fields]);

  return (
    <div>
      <Grid container className="py-1">
        <Grid xs={12} sm={3} item>
          <FormFields
            fields={form?.fields}
            setFields={() => null}
            previewMode
            isWorkflow
            onClickField={(selectedField) => setField(selectedField)}
            selectedFieldId={field?._id}
          />
        </Grid>
        <Grid xs={12} sm={9} item className="pl-2">
          <Paper variant="outlined" className="px-2">
            <DisplayForm _id={field?.form?._id} settings={{ widgetType: 'form' }} />
            {/* <FormView
              // {...responseListProps}
              form={{ ...form, settings: { ...form.settings, widgetType: 'form' } }}
            /> */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
