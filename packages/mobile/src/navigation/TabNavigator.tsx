import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InboxScreen from '../screens/InboxScreen';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator shifting={false}>
      <Tab.Screen
        name="InboxScreen"
        component={InboxScreen}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={InboxScreen}
        options={{
          tabBarBadge: 10,
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar-blank" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Offering"
        component={InboxScreen}
        options={{
          tabBarLabel: 'Offering',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="clipboard-text-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Sessions"
        component={InboxScreen}
        options={{
          tabBarLabel: 'Sessions',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="video" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Clients"
        component={InboxScreen}
        options={{
          tabBarLabel: 'Clients',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-multiple" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
