import React, { useState } from 'react';
import { Tabs } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Signup from '../components/auth/Signup';
import Login from '../components/auth/Login';

const AuthScreen = () => {
  const [value, setValue] = useState('Sign-In');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered>
        <Tab label="Sign-In" value="Sign-In" />
        <Tab label="Sign-Up" value="Sign-Up" />
      </Tabs>
      {value === 'Sign-In' ? <Login /> : <Signup />}
    </div>
  );
};

export default AuthScreen;
