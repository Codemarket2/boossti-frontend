import React from 'react';
import { Button as PaperButton } from 'react-native-paper';

interface IProps {
  children: React.ReactNode;
  mode?: 'text' | 'outlined' | 'contained';
  dense?: boolean;
  disabled?: boolean;
  loading?: boolean;
  dark?: boolean;
  icon?: string;
  contentStyle?: object;
  style?: object;
  onPress?: () => void;
}

export default function Button({
  children,
  dense = false,
  mode = 'contained',
  contentStyle = {},
  ...props
}: IProps) {
  return (
    <PaperButton
      contentStyle={{ paddingVertical: dense ? 0 : 0, ...contentStyle }}
      mode={mode}
      {...props}>
      {children}
    </PaperButton>
  );
}
