import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SignUpForm from '../components/auth/SignUpForm';
import SignInForm from '../components/auth/SignInForm';

interface IProps {
  signinSuccessCallback?: () => void;
}

const AuthScreen = ({ signinSuccessCallback }: IProps) => {
  const [value, setValue] = useState<string>('Sign-In');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

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
        centered
      >
        <Tab label="Sign-In" value="Sign-In" />
        <Tab label="Sign-Up" value="Sign-Up" />
      </Tabs>
      {value === 'Sign-In' ? (
        <SignInForm successCallback={signinSuccessCallback} />
      ) : (
        <SignUpForm />
      )}
    </>
  );
};

export default AuthScreen;
