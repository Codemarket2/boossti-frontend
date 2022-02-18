import { useUpdateSection } from '@frontend/shared/hooks/section';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { onAlert } from '../../utils/alert';
import InputGroup from '../common/InputGroup';
import FormFieldsValue from '../form2/FormFieldsValue';
import ResponseSections from './ResponseSection';
import ErrorLoading from '../common/ErrorLoading';

export default function ResponseLayout({
  _id,
  useCustom = false,
}: {
  _id: string;
  useCustom?: boolean;
}) {
  const { onSectionChange, section, handleUpdateSection, error, loading } = useUpdateSection({
    onAlert,
    _id,
  });

  if (error || !section) {
    return <ErrorLoading error={error} />;
  }

  return (
    <Paper variant="outlined" className="pb-5">
      {useCustom && (
        <InputGroup className="px-2">
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={section?.options?.useCustom}
                onChange={(e) => {
                  onSectionChange({ options: { ...section.options, useCustom: e.target.checked } });
                }}
              />
            }
            label="Use custom response layout"
          />
        </InputGroup>
      )}
      {(!useCustom || section?.options?.useCustom) && (
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
      )}
    </Paper>
  );
}
