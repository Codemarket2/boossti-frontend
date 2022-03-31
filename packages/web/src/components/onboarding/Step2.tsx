import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ImageIcon from '@mui/icons-material/Image';
import { onboarding } from '@frontend/shared/config/onboarding';

export default function Step2({ handleContinue }) {
  return (
    <div>
      <Typography variant="h1" align="center" color="primary" className="mb-5">
        {onboarding.step2.title}
      </Typography>
      <Typography variant="h4" align="center">
        {onboarding.step2.subTitle}
      </Typography>
      <div className="mt-5 justify-content-center align-items-center w-100 text-center">
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Coaching is personal. No matter what your expertise is, this is the place to share it." />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Achieve better results. From introduction to impact, all of Drreamz is at your fingertips." />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="A new opportunity. Wherever and whenever you need, you'll always have someone to turn to." />
          </ListItem>
        </List>
      </div>
      <div className="text-center mt-5">
        <Button variant="contained" color="primary" size="large" onClick={() => handleContinue(3)}>
          Continue
        </Button>
      </div>
    </div>
  );
}
