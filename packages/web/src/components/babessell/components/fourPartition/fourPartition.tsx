import * as React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';

export interface IAppProps {
  backgroundColor?: string;
  color?: string;
  minHeight?: string;
  imageUrl?: string;
  title?: string;
  desc?: string;
  buttonLabel?: string;
  buttonLink?: string;
}

export default function FourPartition({
  backgroundColor,
  color,
  minHeight,
  imageUrl,
  title,
  desc,
  buttonLabel,
  buttonLink,
}: IAppProps) {
  const useStyles = makeStyles((theme) => ({
    container: {
      margin: '5vh 5vw 5vh 5vw',

      //   minHeight: '60vh',
      minHeight,
      width: '90vw',
      //   backgroundColor: '#F1F8FE',
      backgroundColor,
      //   color: 'black',
      color,
    },
    button: {
      backgroundColor: 'black',
      color: 'white',
      padding: '10px 20px',
      //   marginTop: '20vh',
    },
    centerElement: {
      marginLeft: '5vw',
      marginRight: '5vw',
      marginTop: '15vh',
      marginBottom: '15vh',
    },
  }));
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item md={4} xs={12}>
        <Box className={classes.centerElement}>
          <Typography variant="h3" component="h3" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom align="justify">
            {desc}
          </Typography>
          <Button variant="outlined" className={classes.button} href={buttonLink}>
            {buttonLabel}
          </Button>
        </Box>
      </Grid>

      <Grid item md={2} xs={12}>
        <img
          style={{
            width: '80%',
            height: '50%',
            marginTop: '15vh',

            marginLeft: '5vw',
            marginRight: '5vw',
          }}
          src={imageUrl}
          alt="somthing"
        />
      </Grid>
      <Grid item md={2} xs={12}>
        <img
          style={{
            width: '80%',
            height: '50%',
            marginTop: '15vh',

            marginLeft: '5vw',
            marginRight: '5vw',
          }}
          src={imageUrl}
          alt="somthing"
        />
      </Grid>
      <Grid item md={2} xs={12}>
        <img
          style={{
            width: '80%',
            height: '50%',
            marginTop: '15vh',

            marginLeft: '5vw',
            marginRight: '5vw',
          }}
          src={imageUrl}
          alt="somthing"
        />
      </Grid>
    </Grid>
  );
}
