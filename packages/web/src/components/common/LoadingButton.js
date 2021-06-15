import React from 'react';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoadingButton({
  label = 'Label',
  type = 'button',
  variant = 'contained',
  color = 'primary',
  loading = false,
  className = '',
  onClick = () => {},
  children,
  disabled = false,
  ...props
}) {
  return (
    <Button
      {...props}
      type={type}
      variant={variant}
      color={color}
      disabled={disabled || loading}
      className={className}
      onClick={onClick}>
      {children}
      {loading && <CircularProgress style={{ position: 'absolute' }} size={25} />}
    </Button>
  );
}
