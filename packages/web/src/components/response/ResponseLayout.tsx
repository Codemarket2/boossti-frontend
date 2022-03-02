import { useUpdateSection } from '@frontend/shared/hooks/section';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { onAlert } from '../../utils/alert';
import InputGroup from '../common/InputGroup';
import FormFieldsValue from '../form2/FormFieldsValue';
import ResponseSections from './ResponseSection';
import ErrorLoading from '../common/ErrorLoading';

export default function ResponseLayout({ _id }: { _id: string }) {
  const { onSectionChange, section, handleUpdateSection, error } = useUpdateSection({
    onAlert,
    _id,
  });

  if (error || !section) {
    return <ErrorLoading error={error} />;
  }

  return (
    <Paper variant="outlined" className="pb-5">
      <InputGroup className="px-2">
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={section?.options?.belowResponse}
              onChange={(e) => {
                onSectionChange({
                  options: { ...section.options, belowResponse: e.target.checked },
                });
              }}
            />
          }
          label="Show sections below response"
        />
      </InputGroup>
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
            layouts={section?.options?.layouts || {}}
            disableGrid={false}
            onLayoutChange={(layouts) =>
              onSectionChange({
                options: { ...section?.options, layouts },
              })
            }
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
