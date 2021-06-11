import React from 'react';
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
import { useSignin } from '@frontend/shared/hooks/auth';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SendVerificationCodeForm from './SendVerificationCodeForm';
import LoadingButton from '../common/LoadingButton';

const onAlert = (title, message) => {
  alert(`${title}, ${message}`);
};

export default function SignInForm(props) {
  const { state, setState, onSubmit } = useSignin({ mobile: true, onAlert });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(state);
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  if (state.verify) {
    return (
      <SendVerificationCodeForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        email={state.email}
        code={state.code}
        disabled={state.disabled}
        label="Sign In Again?"
        onLabelClick={() => props.changeLogin(false)}
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
            onClick={() => props.changeLogin(false)}>
            Lost your password?
          </FormHelperText>
          <br />
          <LoadingButton type="submit" loading={state.disabled} className="mt-2">
            Sign In
          </LoadingButton>
          <br />
          <Button
            type="button"
            variant="contained"
            color="secondary"
            className="w-100 my-2 mt-5"
            size="large"
            onClick={() => Auth.federatedSignIn({ provider: 'Google' })}>
            Sign in with Google
          </Button>
          <br />
          <Button
            type="button"
            variant="contained"
            color="secondary"
            className="w-100 my-2"
            size="large"
            onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}>
            Sign in with Facebook
          </Button>
        </div>
      </form>
    );
  }
}
