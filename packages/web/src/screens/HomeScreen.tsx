import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import StarIcon from '@mui/icons-material/Star';
import CardHeader from '@mui/material/CardHeader';
import React from 'react';
import Avatar from '@mui/material/Avatar';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import AppBar from '../components/common/AppBar';
import { FormPage } from '../../pages/forms/[slug]';

const PREFIX = 'HomeScreen';

const classes = {
  root: `${PREFIX}-root`,
  image: `${PREFIX}-image`,
  paper: `${PREFIX}-paper`,
  avatar: `${PREFIX}-avatar`,
  form: `${PREFIX}-form`,
  submit: `${PREFIX}-submit`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    height: '100vh',
  },

  [`& .${classes.image}`]: {
    backgroundImage: 'url("/handshake.png")',
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    paddingBottom: '60%',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  [`& .${classes.paper}`]: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  [`& .${classes.avatar}`]: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  [`& .${classes.form}`]: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  [`& .${classes.submit}`]: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.boossti.com">
        Boossti
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function SignInSide() {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Root>
      <AppBar />
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Active" />
          <Tab label="Disabled" disabled />
          <Tab label="Active" />
        </Tabs>
      </Paper>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={4} md={5} className={classes.image} />
        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Paper square>
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
              >
                <Tab label="Gift Cards" />
                <Tab label="Raffle Prize" />
              </Tabs>
            </Paper>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <FormPage slug="gift-card-campaigns" />

            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </Grid>
      </Grid>
    </Root>
  );
}
