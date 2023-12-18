import React from 'react';
import { View, Text } from 'react-native';
import { Button, Caption, Headline, Divider } from 'react-native-paper';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps {
  handleSubscribe: (subscriptionType: string) => void;
}

const Card = styled.View`
  margin: 8px 0;
  flex-direction: row;
  align-items: center;
`;

const Gap = styled.View`
  margin: 10px 0;
`;

export default function Step3({ handleSubscribe }: IProps) {
  return (
    <View>
      <Headline style={{ textAlign: 'center' }}>Try Drreamz for free</Headline>
      <Gap />
      <CardComponent caption={`Unlock the full Drreamz experience`} />
      <Divider />
      <CardComponent caption={`Manage your entire business in one place`} />
      <Divider />
      <CardComponent caption={`Grow your community and collaboration`} />
      <Divider />
      <CardComponent caption={`Develop & launch new programs`} />
      <Gap />
      <Button mode="contained" onPress={() => handleSubscribe('annual')}>
        Annual (Best Value) $315
      </Button>
      <Gap />
      <Button mode="outlined" onPress={() => handleSubscribe('monthly')}>
        Monthly $29
      </Button>
      <Gap />
      <Caption style={{ textAlign: 'center' }}>
        After free trial, annual subscription automatically renews each year and monthly
        subscription automatically renews each month. If you subscribe before your free trial ends,
        the rest of your free trial period will be forfeited as soon as your purchase is confirmed.
        Eligible for new users only
      </Caption>
      <Gap />
      <Button mode="contained" onPress={() => handleSubscribe('trial')}>
        try free and subscribe
      </Button>
    </View>
  );
}

interface ICardProps {
  caption: string;
}

const CardComponent = ({ caption }: ICardProps) => (
  <Card>
    <View>
      <MaterialCommunityIcons name="briefcase-variant" size={40} />
    </View>
    <View style={{ marginLeft: 8 }}>
      <Caption>{caption}</Caption>
    </View>
  </Card>
);
