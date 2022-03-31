import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';

interface IProps {
  error: boolean;
  value: string;
  onChange: (a: any) => void;
  helperText: string;
  name: string;
  label: string;
  className?: string;
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'standard' | 'filled';
  fullWidth: boolean;
  labelWidth: number;
  disabled?: boolean;
}

export default function PasswordInput({
  error = false,
  value,
  onChange,
  helperText,
  name,
  label,
  size = 'medium',
  variant = 'outlined',
  className = '',
  fullWidth = false,
  labelWidth = 50,
  disabled = false,
}: IProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };
  return (
    <FormControl
      disabled={disabled}
      fullWidth={fullWidth}
      className={className}
      variant={variant}
      size={size}
      error={error}
    >
      <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>
      <OutlinedInput
        id={`outlined-adornment-${name}`}
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="large"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        // labelWidth={labelWidth}
      />
      {error && helperText && (
        <FormHelperText role="button" className="cursor-pointer d-inline-block">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
