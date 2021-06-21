import React from 'react';
import { View, Text } from 'react-native';
import Screen from '../components/common/Screen';
import { ViewStyle, StatusBar } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

const StyledView = styled.View`
  padding: 10px;
  flex: 1;
  background-color: white;
  padding-top: 0px;
`;

export default function SampleScreen() {
  // const loading = useSelector(({ loading }: { loading: boolean }) => loading);
  return (
    <Screen>
      <Text testID="title-text">SampleScreen</Text>
    </Screen>
  );
}
