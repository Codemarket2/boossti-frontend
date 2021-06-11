import React from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
import LoadingButton from '../common/LoadingButton';

export default function SendVerificationCodeForm({
  handleSubmit,
  handleChange,
  email,
  code,
  disabled,
  label = '',
  onLabelClick,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <p>Verify your email!</p>
      <small>Verification code has been sent to {email}</small>
      <TextField
        label="Verification Code"
        variant="outlined"
        className="w-100 my-2"
        onChange={handleChange}
        value={code}
        type="text"
        name="code"
        size="small"
        required
      />
      {label && (
        <FormHelperText
          onClick={() => setState({ ...state, verify: false })}
          role="button"
          className="cursor-pointer d-inline-block"
          onClick={onLabelClick}>
          {label}
        </FormHelperText>
      )}
      <br />
      <LoadingButton type="submit" loading={disabled}>
        Verify
      </LoadingButton>
    </form>
  );
}
