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
    margin: '5vh 5vw 5vh 5vw',
    minHeight: '80vh',
    width: '90vw',
    // backgroundColor: '#F1F8FE',
    color: 'black',
  },
  button: {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 20px',
    marginTop: '2vh',
  },
  centerElement: {
    marginLeft: '5vw',
    marginRight: '5vw',
    marginTop: '20vh',
  },
}));

export default function TwoPartition2(props) {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item md={6} xs={12}>
        <Box className={classes.centerElement}>
          <Typography variant="h3" component="h3" gutterBottom>
            Empower every student with inclusive tools
          </Typography>
          <Typography variant="body1" component="p" gutterBottom align="justify">
            Microsoft Edge offers the most comprehensive set of built-in learning and accessibility
            tools on the web, with Immersive Reader facilitating reading comprehension, and Read
            Aloud letting students listen to webpages like podcasts.
          </Typography>
          <Button variant="outlined" className={classes.button}>
            Learn more
          </Button>
        </Box>
      </Grid>
      <Grid item md={6} xs={12}>
        <img
          style={{
            width: '90%',
            height: '90%',
            marginTop: '10vh',

            marginLeft: '5vw',
            marginRight: '5vw',
          }}
          src="https://edgestatic.azureedge.net/shared/cms/lrs1c69a1j/section-images/8109fb3d11d744d7842b562826407623.jpg"
          alt="somthing"
        />
      </Grid>
    </Grid>
  );
}
