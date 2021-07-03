import React from 'react';
import { Title, Button } from 'react-native-paper';
import Screen from '../components/common/Screen';
import { useSubscription } from '@frontend/shared/hooks/subscription';
import { onAlert } from '../utils/alert';

export default function InboxScreen() {
  const { handleSendNotification, loading } = useSubscription({ onAlert });
  return (
    <Screen>
      <Title>Click on this subscribe button so that you get a notification</Title>
      <Button
        mode="contained"
        loading={loading}
        disabled={loading}
        onPress={handleSendNotification}>
        Subscribe
      </Button>
    </Screen>
  );
}
