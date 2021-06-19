import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native';
import InboxScreen from '../screens/InboxScreen';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      shifting={false}
      initialRouteName="Feed"
      activeColor="#ffffff"
      barStyle={{ backgroundColor: '#6200EE' }}>
      <Tab.Screen
        name="Inbox"
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
        component={SampleComponent}
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
        component={SampleComponent}
        options={{
          tabBarLabel: 'Offering',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="clipboard-text-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Sessions"
        component={SampleComponent}
        options={{
          tabBarLabel: 'Sessions',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="video" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Clients"
        component={SampleComponent}
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

function SampleComponent() {
  return <Text>SampleComponent</Text>;
}
