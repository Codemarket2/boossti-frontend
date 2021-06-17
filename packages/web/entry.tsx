import React from 'react';
import Index from './pages/index';
import Users from './pages/users';
import Auth from './pages/auth';

export default function Entry() {
  return (
    <div>
      <Index />
      <Auth />
      <Users />
    </div>
  );
}
