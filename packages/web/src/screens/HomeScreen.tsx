import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import projectConfig from '@frontend/shared';

export default function Album() {
  return (
    <main className="d-flex flex-column justify-content-center" style={{ minHeight: '70vh' }}>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        {projectConfig.title}
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        {projectConfig.description}
      </Typography>
      <div>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button variant="contained" color="primary">
              Main call to action
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary">
              Secondary action
            </Button>
          </Grid>
        </Grid>
      </div>
    </main>
  );
}
