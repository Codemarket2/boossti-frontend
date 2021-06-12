import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import {
  TextField,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
  Button,
  FormHelperText,
} from '@material-ui/core';
import { useSignIn } from '@frontend/shared/hooks/auth';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import SendVerificationCodeForm from './SendVerificationCodeForm';
import LoadingButton from '../common/LoadingButton';
import ForgetPasswordForm from './ForgetPasswordForm';

const onAlert = (title: string, message: string): void => {
  alert(`${title}, ${message}`);
};

export default function SignInForm() {
  const { state, setState, onSubmit } = useSignIn({ onAlert });

  const [showLogin, setShowLogin] = useState<boolean>(true);

  const changeLogin = (v: boolean) => {
    setShowLogin(v);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await onSubmit();
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setState({ ...state, email: '', password: '' });
  }, [state.verify, showLogin]);

  if (!showLogin) {
    return <ForgetPasswordForm changeLogin={changeLogin} />;
  } else if (state.verify) {
    return (
      <SendVerificationCodeForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        email={state.email}
        code={state.code}
        disabled={state.disabled}
        label="Sign In Again?"
        onLabelClick={() => changeLogin(false)}
      />
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Email"
            variant="outlined"
            className="w-100 my-3"
            onChange={handleChange}
            value={state.email}
            type="email"
            name="email"
            size="small"
            required
          />
          <FormControl className="my-3 w-100" variant="outlined" size="small" required>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={state.showPassword ? 'text' : 'password'}
              onChange={handleChange}
              value={state.password}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={80}
            />
          </FormControl>
          <FormHelperText
            role="button"
            className="cursor-pointer d-inline-block"
            onClick={() => changeLogin(false)}>
            Lost your password?
          </FormHelperText>
          <br />
          <LoadingButton type="submit" loading={state.disabled} className="mt-2">
            Sign In
          </LoadingButton>
          <br />
          <Button
            disabled
            type="button"
            variant="contained"
            color="secondary"
            className="w-100 my-2 mt-5"
            size="large"
            onClick={() =>
              Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })
            }>
            Sign in with Google
          </Button>
          <br />
          <Button
            disabled
            type="button"
            variant="contained"
            color="secondary"
            className="w-100 my-2"
            size="large"
            onClick={() =>
              Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })
            }>
            Sign in with Facebook
          </Button>
        </div>
      </form>
    );
  }
}
