import { useUpdateSection } from '@frontend/shared/hooks/section';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { onAlert } from '../../utils/alert';
import InputGroup from '../common/InputGroup';
import FormFieldsValue from '../form2/FormFieldsValue';
import ResponseSections from './ResponseSection';
import ErrorLoading from '../common/ErrorLoading';

export default function Workflow({
  _id,
  parentPageFields = [],
}: {
  _id: string;
  parentPageFields?: any;
}) {
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
      <InputGroup className="px-2">
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={section?.options?.showRelation}
              onChange={(e) => {
                onSectionChange({
                  options: { ...section.options, showRelation: e.target.checked },
                });
              }}
            />
          }
          label="Show relation response"
        />
      </InputGroup>
      <Grid container>
        <Grid item xs={12} md={3}>
          <ResponseSections
            section={section}
            onSectionChange={onSectionChange}
            authorized
            title="Workflows"
            parentPageFields={parentPageFields}
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
