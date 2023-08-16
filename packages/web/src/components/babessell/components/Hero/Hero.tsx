import * as React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage:
      'url("https://edgestatic.azureedge.net/shared/cms/lrs1c69a1j/section-images/2784f17746804f7094f1effa3dba4c68.jpg")',
    backgroundSize: 'cover',
    minHeight: '90vh',
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    color: 'black',
    padding: '10px 20px',
  },
  centerElement: {
    marginLeft: '5vw',
    marginRight: '5vw',
    marginTop: '20vh',
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Hero(props) {
  const classes = useStyles();
  return (
    <Box style={{ width: '100%' }}>
      <Grid container spacing={2} className={classes.container}>
        <Grid item md={6} xs={12}>
          <Box className={classes.centerElement}>
            <Typography variant="h2" component="h2" gutterBottom>
              Choose Microsoft Edge for AI-powered
            </Typography>

            <Button variant="outlined" className={classes.button}>
              Try Edge
            </Button>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <img
            style={{
              width: '80%',
              height: '50%',
              marginTop: '20vh',

              marginLeft: '5vw',
              marginRight: '5vw',
            }}
            src="https://edgestatic.azureedge.net/shared/cms/lrs1c69a1j/section-images/e2258d06158940118ce733c03dbf26cf.jpg"
            alt="somthing"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
