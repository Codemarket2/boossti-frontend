import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/auth/SignInScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgetPasswordScreen from '../screens/auth/ForgetPasswordScreen';
import AppBar from '../components/common/AppBar';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} />,
      }}>
      <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
    </Stack.Navigator>
  );
}
