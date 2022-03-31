import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface IProps extends ButtonProps {
  // type?: 'button' | 'submit';
  // size?: 'small' | 'medium' | 'large';
  // variant?: 'contained' | 'outlined';
  // color?: 'primary' | 'secondary';
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  children: any;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function LoadingButton({
  type = 'button',
  variant = 'contained',
  color = 'primary',
  loading = false,
  className = '',
  onClick = () => {},
  children,
  disabled = false,
  ...props
}: IProps) {
  return (
    <Button
      {...props}
      type={type}
      variant={variant}
      color={color}
      disabled={disabled || loading}
      className={className}
      onClick={onClick}
    >
      {children}
      {loading && <CircularProgress style={{ position: 'absolute' }} size={25} />}
    </Button>
  );
}
