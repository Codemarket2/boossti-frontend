import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SampleScreen from '../screens/SampleScreen';
import UserScreen from '../screens/admin/UserScreen';
import AppBar from '../components/common/AppBar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../components/common/Drawer';
import projectConfig from '@frontend/shared';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => (
          <AppBar {...props} authenticated={true} title={projectConfig + 'Admin'} />
        ),
      }}
    >
      <Stack.Screen name="UserScreen" component={UserScreen} />
      <Stack.Screen name="SampleScreen" component={SampleScreen} />
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
