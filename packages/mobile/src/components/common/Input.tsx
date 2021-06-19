import React from 'react';
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
  autoCompleteType?:
    | 'name'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'email'
    | 'password'
    | 'postal-code'
    | 'street-address'
    | 'tel'
    | 'username'
    | 'off'
    | undefined;
  keyboardType?:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'phone-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
}

const StyledCaption = styled(Caption)`
  color: red;
`;

export default function Input({
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
  return (
    <>
      <TextInput
        {...props}
        mode={mode}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        error={error}
      />
      {error && <StyledCaption>{errorMessage}</StyledCaption>}
    </>
  );
}
