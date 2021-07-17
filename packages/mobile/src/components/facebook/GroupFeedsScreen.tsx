import React, { useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import {
  Divider,
  List,
  Avatar,
  ActivityIndicator,
  Title,
  Paragraph,
  Card,
} from 'react-native-paper';
import { GraphRequestManager, GraphRequest } from 'react-native-fbsdk-next';
import Screen from '../common/Screen';
import { timeAgo } from '../../utils/facebook';

export default function PostsScreen({ route, navigation }: any) {
  const { group } = route?.params;
  const [state, setState] = useState<any>({ feeds: [], loading: false });
  function _responseInfoCallback(error: Object, result: any) {
    if (error) {
      Alert.alert('Error', JSON.parse(error.batchRequestResult).error.message);
      setState({ ...state, loading: false });
    } else {
      setState({ loading: false, feeds: result.data });
    }
  }
  const getUserPages = async () => {
    try {
      setState({ ...state, loading: true });
      const infoRequest = new GraphRequest(
        `/${group?.id}/feed`,
        { parameters: { fields: { string: 'id,message,picture,created_time' } } },
        _responseInfoCallback,
      );
      new GraphRequestManager().addRequest(infoRequest).start();
    } catch (error) {
      console.log(error);
      setState({ ...state, loading: false });
    }
  };
  useEffect(() => {
    getUserPages();
  }, []);
  return (
    <Screen>
      <List.Item
        title={group.name}
        description={group.privacy}
        left={(props) => <Avatar.Image {...props} source={{ uri: group.picture.data.url }} />}
      />
      {state.loading && <ActivityIndicator size="large" animating={true} />}
      <FlatList
        data={state.feeds}
        renderItem={(props) => <CCard {...props} />}
        keyExtractor={(feed: any) => feed.id}
        ItemSeparatorComponent={Divider}
      />
    </Screen>
  );
}

const CCard = ({ item: feed }: any) => {
  return (
    <Card>
      <Card.Content>
        {feed.picture && (
          <Card.Cover
            source={{
              uri: feed.picture,
            }}
          />
        )}
        <Title>{feed.message}</Title>
        <Paragraph>{timeAgo(feed.created_time)}</Paragraph>
      </Card.Content>
    </Card>
  );
};
