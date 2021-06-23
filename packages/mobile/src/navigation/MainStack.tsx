import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
// import { useInitialUser } from '@frontend/shared/hooks/users';
import UserStack from './UserStack';
import AuthScreen from '../screens/auth/AuthScreen';
import LoadingScreen from '../screens/LoadingScreen';
import AppBar from '../components/common/AppBar';

const Stack = createStackNavigator();

function MainStack() {
  // useInitialUser();
  const { authenticated, initial } = useSelector(({ auth }: any) => ({
    authenticated: auth.authenticated,
    initial: auth.initial,
  }));
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} authenticated={authenticated} />,
      }}>
      {!initial ? (
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
      ) : authenticated ? (
        <Stack.Screen name="UserStack" component={UserStack} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
}

export default MainStack;
