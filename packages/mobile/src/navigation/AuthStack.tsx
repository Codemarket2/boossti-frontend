import React from 'react';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        indicatorStyle: { backgroundColor: '#6200EE' },
        activeTintColor: '#6200EE',
      }}>
      <Tab.Screen name="Sign In" component={SignInScreen} />
      <Tab.Screen name="Sign Up" component={SignUpScreen} />
    </Tab.Navigator>
  );
}
