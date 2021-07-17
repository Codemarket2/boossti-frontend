import React from 'react';
import ProfileCard from '../components/user/ProfileCard';
import MyPostsList from '../components/post/MyPostsList';

export default function ProfileScreen() {
  return (
    <div>
      <ProfileCard />
      <MyPostsList />
    </div>
  );
}
