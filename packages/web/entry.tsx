import React from 'react';
import Index from './pages/index';
import Users from './pages/users';
import Auth from './pages/auth';
import Sample from './pages/Sample';

export default function Entry() {
  return (
    <div>
      <Index />
      <Auth />
      <Users />
      <Sample />
    </div>
  );
}
