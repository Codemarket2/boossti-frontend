import React from 'react';
import { Story, Meta } from '@storybook/react';

import UserCard, { IProps } from '../UserCard';

export default {
  title: 'Example/UserCard',
  component: UserCard,
} as Meta;

const Template: Story<IProps> = (args) => <UserCard {...args} />;

export const UsersListCard = Template.bind({});
UsersListCard.args = {
  user: {
    name: 'vivekvt',
    username: 'vivekvt',
    picture:
      'https://parkyourself-content-bucket15051-dev.s3.amazonaws.com/public/assets/images/default.jpg',
    listings: 1,
    bookings: 2,
    active: true,
    createdAt: new Date(),
  },
  handleToggle: () => {},
  showTime: false,
};

export const UserRegStatsCard = Template.bind({});
UserRegStatsCard.args = {
  user: {
    name: 'vivekvt',
    username: 'vivekvt',
    picture:
      'https://parkyourself-content-bucket15051-dev.s3.amazonaws.com/public/assets/images/default.jpg',
    listings: 1,
    bookings: 2,
    active: true,
    createdAt: new Date(),
  },
  handleToggle: () => {},
  showTime: true,
};
