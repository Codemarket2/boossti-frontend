import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TabNavigator from './TabNavigator';
import OnboardingScreen from '../screens/OnboardingScreen';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="OnboardingScreen"
        component={OnboardingScreen}
      />
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{
          headerTitle: 'Drreamz',
          headerRight: () => (
            <MaterialIcons name="settings" color="black" size={29} style={{ marginRight: 10 }} />
          ),
          headerLeft: () => (
            <MaterialCommunityIcons
              name="account-circle"
              color="black"
              size={30}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
