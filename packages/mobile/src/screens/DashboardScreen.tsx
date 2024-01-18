import React from 'react';
import { Button, Headline } from 'react-native-paper';
import Screen from '../components/common/Screen';
import { useCancelSubscription } from '@frontend/shared/hooks/onBoarding';

export default function DashboardScreen() {
  const { handleCancelSubscribe, loading } = useCancelSubscription();
  return (
    <Screen>
      <Headline>DashboardScreen</Headline>
      <Button loading={loading} mode="contained" onPress={() => handleCancelSubscribe()}>
        Cancel Subscription
      </Button>
    </Screen>
  );
}
