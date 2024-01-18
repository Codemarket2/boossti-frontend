import { Alert } from 'react-native';

export const onAlert = (title: string, message: string): void => {
  Alert.alert(title, message);
};
