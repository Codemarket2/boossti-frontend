import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TabNavigator from './TabNavigator';
import OnboardingScreen from '../screens/OnboardingScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AppBar from '../components/common/AppBar';

const Stack = createStackNavigator();

function MainStack() {
  const user = useSelector(({ auth }: any) => auth.user);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* {user && user.subscription && user.subscription.active ? (
        <Stack.Screen
          // options={{ headerShown: false }}
          name="Dashboard"
          component={DashboardScreen}
        />
      ) : (
        <Stack.Screen
          options={{ headerShown: false }}
          name="OnboardingScreen"
          component={OnboardingScreen}
        />
      )} */}
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}

export default MainStack;
