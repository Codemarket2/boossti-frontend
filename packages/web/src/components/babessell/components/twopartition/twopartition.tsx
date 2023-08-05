/* eslint-disable */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';

export default function TwoPartition({
  backgroundColor,
  color,
  minHeight,
  imageUrl,
  title,
  desc,
  buttonLabel,
  buttonLink,
  thirdBox = false,
  thirdBoxTitle = '',
}) {
  const useStyles = makeStyles((theme) => ({
    container: {
      margin: '5vh 5vw 5vh 5vw',
      // minHeight: '80vh',
      minHeight,
      width: '90vw',
      // backgroundColor: '#F1F8FE',
      backgroundColor,
      // color: 'black',
      color,
    },
    button: {
      backgroundColor: '#fff',
      color: 'black',
      padding: '10px 20px',
      marginTop: '2vh',
    },
    centerElement: {
      marginLeft: '5vw',
      marginRight: '5vw',
      marginTop: '20vh',
    },
    thirdBox: {
      padding: '2vh 2vw 2vh 2vw',
      backgroundColor: '#F1F8FE',
      color: 'black',
      marginTop: '2vh',
      borderRadius: '5%',
    },
  }));
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item md={6} xs={12}>
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
          {thirdBox && (
            <Box className={classes.thirdBox}>
              <Typography variant="body1" component="p" gutterBottom align="justify">
                {thirdBoxTitle}
              </Typography>
            </Box>
          )}
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
          src={imageUrl}
          alt="somthing"
        />
      </Grid>
    </Grid>
  );
}
