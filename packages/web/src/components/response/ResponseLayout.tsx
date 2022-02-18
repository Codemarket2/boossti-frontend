import { useUpdateSection } from '@frontend/shared/hooks/section';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { onAlert } from '../../utils/alert';
import FormFieldsValue from '../form2/FormFieldsValue';
import ResponseSections from './ResponseSection';

export default function ResponseLayout({ _id }: { _id: string }) {
  const { onSectionChange, section, handleUpdateSection } = useUpdateSection({ onAlert, _id });
  return (
    <Paper variant="outlined" className="pb-5">
      <Grid container>
        <Grid item xs={12} md={3}>
          <ResponseSections
            section={section}
            onSectionChange={onSectionChange}
            authorized
            title="Response sections"
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <FormFieldsValue
            authorized
            fields={section?.fields}
            values={section?.values}
            handleValueChange={handleUpdateSection}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
