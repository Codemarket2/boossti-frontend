import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import InboxIcon from '@mui/icons-material/Inbox';

interface IProps {
  handleSubscribe: (subscriptionType: string) => void;
}

export default function Step3({ handleSubscribe }: IProps) {
  return (
    <div>
      <Typography color="primary" variant="h1" align="center">
        Try Drreamz for free
      </Typography>
      <List component="div" className="text-center mt-3">
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Unlock the full Drreamz experience" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Manage your entire business in one place" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Grow your community and collaboration" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Develop & launch new programs" />
        </ListItem>
      </List>
      <div className="text-center mt-5">
        <Button
          className="w-75"
          variant="contained"
          color="primary"
          size="large"
          onClick={() => handleSubscribe('annual')}
        >
          Annual (Best Value) $315
          <br />
          First 14 days free
        </Button>
        <div className="my-4" />
        <Button
          className="w-75"
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => handleSubscribe('monthly')}
        >
          Monthly $29
          <br />
          First 7 days free
        </Button>
        <div className="my-4">
          <Typography>
            After free trial, annual subscription automatically renews each year and monthly
            subscription automatically renews each month. If you subscribe before your free trial
            ends, the rest of your free trial period will be forfeited as soon as your purchase is
            confirmed. Eligible for new users only
          </Typography>
        </div>
        <Button
          className="w-75"
          variant="contained"
          color="primary"
          size="large"
          onClick={() => handleSubscribe('trial')}
        >
          try free and subscribe
        </Button>
      </div>
    </div>
  );
}
