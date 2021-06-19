import React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';
import Screen from '../components/common/Screen';

export default function LoadingScreen() {
  return (
    <Screen
      style={{ justifyContent: 'center' }}
      safeArea
      barStyle="dark-content"
      barBackgroundColor="white">
      <ActivityIndicator size="large" />
    </Screen>
  );
}
