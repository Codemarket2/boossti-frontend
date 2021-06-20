import React, { useState } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';

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
      error={error}>
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
              edge="end">
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={labelWidth}
      />
      {error && helperText && (
        <FormHelperText role="button" className="cursor-pointer d-inline-block">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
