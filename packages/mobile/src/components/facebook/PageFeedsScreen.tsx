import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import {
  Divider,
  List,
  Avatar,
  ActivityIndicator,
  FAB,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';
import { GraphRequestManager, GraphRequest } from 'react-native-fbsdk-next';
import Screen from '../common/Screen';
import { timeAgo } from '../../utils/facebook';

export default function PostsScreen({ route, navigation }: any) {
  const { page } = route?.params;
  const [state, setState] = useState<any>({ feeds: [], loading: false });
  function _responseInfoCallback(error: Object, result: any) {
    if (error) {
      // console.log('Error fetching data: ', error);
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
        `/${page?.id}/feed`,
        { parameters: { fields: { string: 'id,message,full_picture,created_time' } } },
        _responseInfoCallback,
      );
      new GraphRequestManager().addRequest(infoRequest).start();
    } catch (error) {
      console.log(error);
      setState({ ...state, loading: false });
    }
  };
  // useEffect(() => {
  //   getUserPages();
  // }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserPages();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <Screen>
      <List.Item
        title={page.name}
        description={page.category}
        left={(props) => <Avatar.Image {...props} source={{ uri: page.picture.data.url }} />}
      />
      {state.loading && <ActivityIndicator size="large" animating={true} />}
      <FlatList
        data={state.feeds}
        renderItem={(props) => <CCard {...props} />}
        keyExtractor={(feed: any) => feed.id}
        ItemSeparatorComponent={Divider}
      />
      <FAB
        style={{
          position: 'absolute',
          right: 35,
          bottom: 50,
        }}
        icon="plus"
        onPress={() => navigation.navigate('PageFeedFormScreen', { page })}
      />
    </Screen>
  );
}

const CCard = ({ item: feed }: any) => {
  return (
    <Card>
      <Card.Content>
        {feed.full_picture && (
          <Card.Cover
            source={{
              uri: feed.full_picture,
            }}
          />
        )}
        <Title>{feed.message}</Title>
        <Paragraph>{timeAgo(feed.created_time)}</Paragraph>
      </Card.Content>
    </Card>
  );
};
