import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useInitialUser } from '@frontend/shared/hooks/users';
import UserStack from './UserStack';
import AuthStack from './AuthStack';

const Stack = createStackNavigator();

function MainStack() {
  useInitialUser();
  const authenticated = true;
  return (
    <Stack.Navigator>
      {authenticated ? (
        <Stack.Screen name="UserStack" component={UserStack} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}

export default MainStack;
