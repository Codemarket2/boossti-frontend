import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  TextField,
  Button,
} from '@material-ui/core';
import { SectionHeader } from '../../../../components/molecules';

const useStyles = makeStyles((theme) => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  listItemText: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
  },
  listItem: {
    justifyContent: 'flex-start',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },
  icon: {
    background: 'transparent',
    borderRadius: 0,
  },
  form: {
    maxWidth: 550,
    margin: `0 auto`,
    marginTop: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(10),
    },
    '& .MuiTextField-root': {
      background: theme.palette.background.paper,
    },
    '& .MuiOutlinedInput-input': {
      background: theme.palette.background.paper,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      border: 'solid 1px rgba(0, 0, 0, 0.2)',
    },
  },
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
}));

const Contact = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title="Can't find the answer you need?"
        subtitle="Keep track of what's happening with your data, change permissions, and run reports against your data anywhere in the world. Keep track of what's happening with your data, change permissions."
        subtitleProps={{
          variant: 'body1',
          color: 'textPrimary',
        }}
        data-aos="fade-up"
        align={isMd ? 'center' : 'left'}
      />
      <List disablePadding className={classes.list}>
        <ListItem disableGutters data-aos="fade-up" className={classes.listItem}>
          <ListItemAvatar>
            <Avatar
              src="https://assets.maccarianagency.com/the-front/illustrations/contact-icon-phone.png"
              srcSet="https://assets.maccarianagency.com/the-front/illustrations/contact-icon-phone@2x.png 2x"
              className={classes.icon}
            />
          </ListItemAvatar>
          <ListItemText
            className={classes.listItemText}
            primary="Phone"
            secondary="+39 659-657-0133"
            primaryTypographyProps={{
              variant: 'subtitle1',
              color: 'textSecondary',
            }}
            secondaryTypographyProps={{
              variant: 'subtitle1',
              color: 'textPrimary',
              component: 'span',
            }}
          />
        </ListItem>
        <ListItem disableGutters data-aos="fade-up" className={classes.listItem}>
          <ListItemAvatar>
            <Avatar
              src="https://assets.maccarianagency.com/the-front/illustrations/contact-icon-mail.png"
              srcSet="https://assets.maccarianagency.com/the-front/illustrations/contact-icon-mail@2x.png 2x"
              className={classes.icon}
            />
          </ListItemAvatar>
          <ListItemText
            className={classes.listItemText}
            primary="Email"
            secondary="hi@maccarianagency.com"
            primaryTypographyProps={{
              variant: 'subtitle1',
              color: 'textSecondary',
            }}
            secondaryTypographyProps={{
              variant: 'subtitle1',
              color: 'textPrimary',
            }}
          />
        </ListItem>
        <ListItem disableGutters data-aos="fade-up" className={classes.listItem}>
          <ListItemAvatar>
            <Avatar
              src="https://assets.maccarianagency.com/the-front/illustrations/contact-icon-pin.png"
              srcSet="https://assets.maccarianagency.com/the-front/illustrations/contact-icon-pin@2x.png 2x"
              className={classes.icon}
            />
          </ListItemAvatar>
          <ListItemText
            className={classes.listItemText}
            primary="Head Office"
            secondary="Via E. Golla 4"
            primaryTypographyProps={{
              variant: 'subtitle1',
              color: 'textSecondary',
            }}
            secondaryTypographyProps={{
              variant: 'subtitle1',
              color: 'textPrimary',
            }}
          />
        </ListItem>
      </List>
      <div className={classes.form}>
        <Grid container spacing={isMd ? 4 : 2}>
          <Grid item xs={12} data-aos="fade-up">
            <Typography variant="subtitle1" color="textPrimary" className={classes.inputTitle}>
              Full name
            </Typography>
            <TextField
              placeholder="Your full name"
              variant="outlined"
              size="medium"
              name="fullname"
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} data-aos="fade-up">
            <Typography variant="subtitle1" color="textPrimary" className={classes.inputTitle}>
              E-mail
            </Typography>
            <TextField
              placeholder="Your e-mail address"
              variant="outlined"
              size="medium"
              name="email"
              fullWidth
              type="email"
            />
          </Grid>
          <Grid item xs={12} data-aos="fade-up">
            <Typography variant="subtitle1" color="textPrimary" className={classes.inputTitle}>
              Message
            </Typography>
            <TextField
              placeholder="Your question about our services"
              variant="outlined"
              name="message"
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item container justify="center" xs={12}>
            <Button variant="contained" type="submit" color="primary" size="large">
              submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Contact;
