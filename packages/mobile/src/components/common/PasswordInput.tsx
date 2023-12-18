import React, { useState } from 'react';
import { TextInput, Caption } from 'react-native-paper';
import styled from 'styled-components/native';

interface IProps {
  mode?: 'outlined' | 'flat';
  label: string;
  placeholder: string;
  disabled?: boolean;
  onChangeText: (a: any) => void;
  onBlur: (a: any) => void;
  value: string;
  error: boolean | undefined;
  errorMessage: string | undefined;
}

const StyledCaption = styled(Caption)`
  color: ${(props) => props.theme.colors.error};
`;

export default function PasswordInput({
  mode = 'outlined',
  label,
  placeholder,
  disabled,
  onChangeText,
  onBlur,
  value,
  error,
  errorMessage,
  ...props
}: IProps) {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <>
      <TextInput
        dense
        secureTextEntry={showPassword}
        mode={mode}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        error={error}
        {...props}
        right={
          <TextInput.Icon
            onPress={() => setShowPassword(!showPassword)}
            name={!showPassword ? 'eye' : 'eye-off'}
          />
        }
      />
      {error && <StyledCaption>{errorMessage}</StyledCaption>}
    </>
  );
}
