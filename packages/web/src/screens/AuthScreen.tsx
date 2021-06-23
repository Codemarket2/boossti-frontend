import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SignUpForm from '../components/auth/SignUpForm';
import SignInForm from '../components/auth/SignInForm';

const AuthScreen = () => {
  const [value, setValue] = useState<string>('Sign-In');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        variant={matches ? 'fullWidth' : 'standard'}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        centered>
        <Tab label="Sign-In" value="Sign-In" />
        <Tab label="Sign-Up" value="Sign-Up" />
      </Tabs>
      {value === 'Sign-In' ? <SignInForm /> : <SignUpForm />}
    </>
  );
};

export default AuthScreen;
