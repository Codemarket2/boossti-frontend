import React, { useState } from 'react';
import {
  TextInput,
  Button,
  Title,
  Avatar,
  Divider,
  List,
  TouchableRipple,
} from 'react-native-paper';
import { GraphRequestManager, GraphRequest } from 'react-native-fbsdk-next';
import { Alert, Keyboard, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// import EmojiBoard from 'react-native-emoji-board';
import {
  // customEmojis,
  emojis,
} from './emoji';
import EmojiModal from './EmojiModal';
import Screen from '../common/Screen';
import InputGroup from '../common/InputGroup';

export default function PostFormScreen({ route }: any) {
  const { page } = route?.params;
  const [state, setState] = useState({
    value: '',
    loading: false,
    showEmojiBoard: false,
    showEmojiModal: false,
    selected: {},
  });

  // console.log('state', state);
  function _responseInfoCallback(error: any, result: any) {
    if (error) {
      //   console.log('Error fetching data: ', JSON.parse(error.batchRequestResult).error.message);
      Alert.alert('Error', JSON.parse(error.batchRequestResult).error.message);
      setState({ ...state, loading: false });
    } else {
      Alert.alert('Success', 'Post Published Successfully');
      setState({ ...state, value: '', loading: false });
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

  const handleSelectEmoji = (emoji: any) => {
    if (emoji.list) {
      setState({ ...state, selected: emoji, showEmojiModal: true });
    } else {
      setState({ ...state, value: state.value + emoji.value });
    }
  };
  return (
    <Screen safeArea>
      <EmojiModal
        visible={state.showEmojiModal}
        selected={state.selected}
        onSelect={(value: string) =>
          setState({ ...state, value: state.value + value, showEmojiModal: false })
        }
        onHide={() => setState({ ...state, showEmojiModal: false })}
      />
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : false}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 110 : 0}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
          showsVerticalScrollIndicator={false}>
          <Title>Create Post</Title>
          <List.Item
            title={page.name}
            description={page.category}
            left={(props) => <Avatar.Text {...props} label={page.name[0]} />}
          />
          <Divider />
          <InputGroup>
            <TextInput
              mode="outlined"
              placeholder="What's on your mind?"
              value={state.value}
              onChangeText={(text) => setState({ ...state, value: text })}
              multiline
              onFocus={() => setState({ ...state, showEmojiBoard: false })}
            />
          </InputGroup>
          {emojis.map((e, i) => {
            return (
              <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {e.map((emoji, i2) => (
                  <TouchableRipple key={i2} onPress={() => handleSelectEmoji(emoji)}>
                    <Avatar.Text
                      style={{ backgroundColor: 'white' }}
                      size={50}
                      label={emoji.value}
                    />
                  </TouchableRipple>
                ))}
              </View>
            );
          })}
          <InputGroup style={state.showEmojiBoard ? { marginBottom: 275 } : {}}>
            <Button
              loading={state.loading}
              disabled={state.loading}
              mode="contained"
              onPress={handlePublishPost}>
              Publish Post
            </Button>
          </InputGroup>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

{
  /* <EmojiBoard
showBoard={state.showEmojiBoard}
onClick={(emoji: any) => {
  setState({ ...state, value: state.value + emoji.code });
}}
onRemove={(emoji: any) => {
  setState({ ...state, value: state.value.slice(0, -1) });
}}
customEmoji={customEmojis}
categories={[
  {
    name: 'Body Parts',
    iconType: IconType.material,
    icon: 'hail',
  },
  {
    name: 'Cancer Emoji',
    iconType: IconType.material,
    icon: 'lungs',
  },
  {
    name: 'Surgery Emoji',
    iconType: IconType.material,
    icon: 'doctor',
  },
  {
    name: 'Chemo Emoji',
    iconType: IconType.material,
    icon: 'spa',
  },
]}
/> */
}

// const IconType = {
//   material: 'material',
//   fontAwesome: 'fontAwesome',
// };

{
  /* <IconButton icon="image" />
            <IconButton icon="tag" />
            <IconButton
              icon="emoticon"
              onPress={() => setState({ ...state, showEmojiModal: !state.showEmojiModal })}
            />
            <IconButton icon="map-marker" />
            <IconButton
              icon="dots-horizontal-circle"
              onPress={() => {
                if (!state.showEmojiBoard) {
                  Keyboard.dismiss();
                }
                setState({ ...state, showEmojiBoard: !state.showEmojiBoard });
              }}
            /> */
}
