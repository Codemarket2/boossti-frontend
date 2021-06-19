import React from 'react';
import { View } from 'react-native';
import { Headline, Subheading, Caption } from 'react-native-paper';
import Screen from '../../components/common/Screen';
import Button from '../../components/common/Button';
import InputGroup from '../../components/common/InputGroup';
import styled from 'styled-components/native';

const StyledScreen = styled(Screen)`
  flex: 1;
  justify-content: space-between;
  margin: 15% 0px;
`;

const Header = styled.View`
  align-items: center;
`;

export default function AuthScreen({ navigation }: any) {
  return (
    <StyledScreen safeArea barStyle="dark-content" barBackgroundColor="white">
      <Header>
        <Caption>{'<Drreamz-Logo>'}</Caption>
        <Headline>Drreamz</Headline>
      </Header>
      <Header>
        <Subheading>Some Subheading Here</Subheading>
      </Header>
      <View>
        <InputGroup>
          <Button mode="contained" onPress={() => navigation.navigate('SignInScreen')}>
            Sign In
          </Button>
        </InputGroup>
        <InputGroup>
          <Button mode="outlined" onPress={() => navigation.navigate('SignUpScreen')}>
            Sign Up
          </Button>
        </InputGroup>
      </View>
    </StyledScreen>
  );
}
