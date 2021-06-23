import React from 'react';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Sign In" component={SignInScreen} />
      <Tab.Screen name="Sign Up" component={SignUpScreen} />
    </Tab.Navigator>
  );
}
