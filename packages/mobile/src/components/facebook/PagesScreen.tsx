import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Divider, List, Avatar, Title, ActivityIndicator } from 'react-native-paper';
import { GraphRequestManager, GraphRequest } from 'react-native-fbsdk-next';
import Screen from '../common/Screen';

export default function PageList({ navigation }: any) {
  const [state, setState] = useState<any>({ pages: [], loading: false });
  function _responseInfoCallback(error: Object, result: any) {
    if (error) {
      console.log('Error fetching data: ', error);
      setState({ ...state, loading: false });
    } else {
      setState({ loading: false, pages: result.data });
    }
  }
  const getUserPages = async () => {
    try {
      setState({ ...state, loading: true });
      const infoRequest = new GraphRequest(`/me/accounts`, null, _responseInfoCallback);
      new GraphRequestManager().addRequest(infoRequest).start();
    } catch (error) {
      console.log(error);
      setState({ ...state, loading: false });
    }
  };
  useEffect(() => {
    getUserPages();
  }, []);

  const handlePageSelect = (page: any) => {
    navigation.navigate('PostFormScreen', { page });
  };

  return (
    <Screen>
      <Title>Your Pages</Title>
      {state.loading && <ActivityIndicator size="large" animating={true} />}
      <FlatList
        data={state.pages}
        renderItem={(props) => <Card {...props} handlePageSelect={handlePageSelect} />}
        keyExtractor={(pages: any) => pages.id}
        ItemSeparatorComponent={Divider}
      />
    </Screen>
  );
}

const Card = ({ item: page, handlePageSelect }: any) => {
  return (
    <List.Item
      title={page.name}
      description={page.category}
      onPress={() => handlePageSelect(page)}
      left={(props) => <Avatar.Text {...props} label={page.name[0]} />}
    />
  );
};
