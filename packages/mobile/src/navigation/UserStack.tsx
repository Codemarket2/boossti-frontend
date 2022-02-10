import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import SampleScreen from '../screens/SampleScreen';
import AppBar from '../components/common/AppBar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../components/common/Drawer';
import FacebookScreen from '../components/facebook/FacebookScreen';
import PageFeedFormScreen from '../components/facebook/PageFeedFormScreen';
import GroupsScreen from '../components/facebook/GroupsScreen';
import PagesScreen from '../components/facebook/PagesScreen';
import PageFeedsScreen from '../components/facebook/PageFeedsScreen';
import GroupFeedsScreen from '../components/facebook/GroupFeedsScreen';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} authenticated={true} />,
      }}
    >
      <Stack.Screen name="FacebookScreen" component={FacebookScreen} />
      <Stack.Screen name="PageFeedFormScreen" component={PageFeedFormScreen} />
      <Stack.Screen name="PagesScreen" component={PagesScreen} />
      <Stack.Screen name="GroupsScreen" component={GroupsScreen} />
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="SampleScreen" component={SampleScreen} />
      <Stack.Screen name="PageFeedsScreen" component={PageFeedsScreen} />
      <Stack.Screen name="GroupFeedsScreen" component={GroupFeedsScreen} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="MainStack" component={MainStack} />
    </Drawer.Navigator>
  );
}
