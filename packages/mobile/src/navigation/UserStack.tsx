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
    <Stack.Navigator>
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
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{
          header: (props) => <AppBar {...props} authenticated={true} />,
          // headerTitle: 'Drreamz',
          // headerRight: () => (
          //   <MaterialIcons name="settings" color="black" size={29} style={{ marginRight: 10 }} />
          // ),
          // headerLeft: () => (
          //   <MaterialCommunityIcons
          //     name="account-circle"
          //     color="black"
          //     size={30}
          //     style={{ marginLeft: 10 }}
          //   />
          // ),
        }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
