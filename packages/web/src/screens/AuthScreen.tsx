import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SignUpForm from '../components/auth/SignUpForm';
import SignInForm from '../components/auth/SignInForm';

const AuthScreen = () => {
  const [value, setValue] = useState<string>('Sign-In');

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered>
        <Tab label="Sign-In" value="Sign-In" />
        <Tab label="Sign-Up" value="Sign-Up" />
      </Tabs>
      {value === 'Sign-In' ? <SignInForm /> : <SignUpForm />}
    </div>
  );
};

export default AuthScreen;
