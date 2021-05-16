/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import type { Node } from 'react';
import StorybookUI from './storybook';
import MainStack from './src/navigation/MainStack';

const App: () => Node = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <NavigationContainer>
      <PaperProvider>
        <MainStack />
      </PaperProvider>
    </NavigationContainer>
  );
};

const startStorybook = false;

export default startStorybook ? StorybookUI : App;
