import React from 'react';
import Index from './pages/index';
import Users from './pages/users';
import Login from './pages/login';
import Sample from './pages/Sample';

export default function Entry() {
  return (
    <div>
      <Index />
      <Login />
      <Users />
      <Sample />
    </div>
  );
}
