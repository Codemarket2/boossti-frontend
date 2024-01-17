import React from 'react';
import { Title, Button } from 'react-native-paper';
import Screen from '../components/common/Screen';
// import { useSubscription } from '@frontend/shared/hooks/subscription';
// import { onAlert } from '../utils/alert';
// import FBButton from '../components/auth/FBButton';

export default function InboxScreen() {
  // const { handleSendNotification, loading } = useSubscription({ onAlert });
  return (
    <Screen>
      <Title>Welcome to our app</Title>
      {/* <FBButton /> */}
      {/* <Button
        mode="contained"
        loading={loading}
        disabled={loading}
        onPress={handleSendNotification}>
        Subscribe
      </Button> */}
    </Screen>
  );
}
