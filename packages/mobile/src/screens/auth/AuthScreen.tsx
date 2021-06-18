import React from 'react';
import { Text, View } from 'react-native';
import { TextInput, Button, Headline, Subheading } from 'react-native-paper';
import Screen from '../../components/common/Screen';

export default function AuthScreen({ navigation }: any) {
  return (
    <Screen safeArea>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          marginVertical: '15%',
        }}>
        <View style={{ alignItems: 'center' }}>
          <Headline>Drreamz-Logo</Headline>
          <Headline>Drreamz</Headline>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Subheading>Some Subheading</Subheading>
        </View>
        <View>
          <Button
            style={{ paddingVertical: 8, marginVertical: 20 }}
            mode="contained"
            onPress={() => navigation.navigate('SignInScreen')}>
            Sign In
          </Button>
          <Button
            style={{ paddingVertical: 8 }}
            mode="outlined"
            onPress={() => navigation.navigate('SignUpScreen')}>
            Sign Up
          </Button>
        </View>
      </View>
    </Screen>
  );
}
