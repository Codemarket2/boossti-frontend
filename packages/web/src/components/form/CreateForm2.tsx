import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function CreateForm() {
  return (
    <div>
      <Grid
        className="justify-content-between"
        spacing={0}
        container
        style={{ minHeight: '100vh !important' }}>
        <Grid item md={3} sm={12} className="bg-danger">
          <Typography variant="h4">Fields</Typography>
        </Grid>
        <Grid item md={6} sm={12} className="px-2">
          <div className="bg-warning">Preview</div>
        </Grid>
        <Grid item md={3} sm={12} className="bg-primary">
          Setting Logic
        </Grid>
      </Grid>
    </div>
  );
}
