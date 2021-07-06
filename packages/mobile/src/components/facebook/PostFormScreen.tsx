import React, { useState } from 'react';
import { TextInput, Button, Headline, Subheading } from 'react-native-paper';
import { GraphRequestManager, GraphRequest } from 'react-native-fbsdk-next';
import { Alert } from 'react-native';
import Screen from '../common/Screen';
import InputGroup from '../common/InputGroup';

export default function PostFormScreen({ route }: any) {
  const { page } = route?.params;
  const [state, setState] = useState({ value: 'Hello from React Native', loading: false });
  function _responseInfoCallback(error: any, result: any) {
    if (error) {
      //   console.log('Error fetching data: ', JSON.parse(error.batchRequestResult).error.message);
      Alert.alert('Error', JSON.parse(error.batchRequestResult).error.message);
      setState({ ...state, loading: false });
    } else {
      Alert.alert('Success', 'Post Published Successfully');
      setState({ value: '', loading: false });
    }
  }
  const handlePublishPost = () => {
    try {
      setState({ ...state, loading: true });
      const infoRequest = new GraphRequest(
        `/${page.id}/feed`,
        {
          accessToken: page.access_token,
          httpMethod: 'POST',
          parameters: {
            message: {
              string: state.value,
            },
          },
        },
        _responseInfoCallback,
      );
      new GraphRequestManager().addRequest(infoRequest).start();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Screen safeArea>
      <Headline>{page.name}</Headline>
      <Subheading>{page.category}</Subheading>
      <InputGroup>
        <TextInput
          mode="outlined"
          label="Message"
          placeholder="Message"
          value={state.value}
          onChangeText={(text) => setState({ ...state, value: text })}
          multiline
        />
        <InputGroup></InputGroup>
        <Button
          loading={state.loading}
          disabled={state.loading}
          mode="contained"
          onPress={handlePublishPost}>
          Publish Post
        </Button>
      </InputGroup>
    </Screen>
  );
}
