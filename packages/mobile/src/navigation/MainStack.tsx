import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
// import { useInitialUser } from '@frontend/shared/hooks/users';
import UserStack from './UserStack';
import AdminStack from './AdminStack';
import AuthScreen from '../screens/auth/AuthScreen';
import LoadingScreen from '../screens/LoadingScreen';
import AppBar from '../components/common/AppBar';

const Stack = createStackNavigator();

function MainStack() {
  // useInitialUser();
  const { authenticated, initial, admin } = useSelector(({ auth }: any) => auth);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!initial ? (
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      ) : authenticated ? (
        <>
          <Stack.Screen name="UserStack" component={UserStack} />
          {admin && <Stack.Screen name="AdminStack" component={AdminStack} />}
        </>
      ) : (
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{
            header: (props) => <AppBar {...props} />,
            headerShown: true,
          }}
        />
      )}
    </Stack.Navigator>
  );
}

export default MainStack;
