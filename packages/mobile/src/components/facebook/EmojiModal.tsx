import React, { useState } from 'react';
import { View, FlatList, Modal } from 'react-native';
import { List, Chip, Avatar, Divider, Appbar } from 'react-native-paper';
import Screen from '../common/Screen';

export default function EmojiModal({ visible, onHide, selected, onSelect }: any) {
  const [state, setState] = useState({ selected1: null, selected2: null, title: 'Select Type' });
  return (
    <Modal visible={visible} onDismiss={onHide}>
      <Screen safeArea barStyle="dark-content" style={{ paddingRight: 0, paddingLeft: 0 }}>
        <Appbar style={{ backgroundColor: 'white', elevation: 0 }}>
          <Appbar.Action icon="close" onPress={onHide} />
          {/* <Appbar.BackAction onPress={onHide} /> */}
          <Appbar.Content title={selected.title} style={{ alignItems: 'flex-start' }} />
        </Appbar>
        <View style={{ padding: 10 }}>
          <FlatList
            data={selected.list}
            renderItem={(props) => (
              <Card
                {...props}
                onSelect={(subValue: string) => onSelect(` ${selected.value} ${subValue} `)}
              />
            )}
            keyExtractor={(item: any) => item.title}
            ItemSeparatorComponent={Divider}
          />
          {/* {state.selected1 ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Chip
                  mode="outlined"
                  onPress={() => console.log('Pressed')}
                  avatar={
                    <Avatar.Image
                      size={24}
                      style={{ backgroundColor: 'white' }}
                      source={{
                        uri: state.selected1.image,
                      }}
                    />
                  }
                  onClose={() => setState({ ...state, selected1: null })}>
                  {state.selected1.name}
                </Chip>
              </View>
              <FlatList
                data={subTypes}
                renderItem={(props) => (
                  <Card
                    {...props}
                    onSelect={(value: any) => setState({ ...state, selected1: value })}
                  />
                )}
                keyExtractor={(pages: any) => pages.name}
                ItemSeparatorComponent={Divider}
              />
            </>
          ) : (
            <FlatList
              data={tea}
              renderItem={(props) => (
                <Card
                  {...props}
                  onSelect={(value: any) => setState({ ...state, selected1: value })}
                />
              )}
              keyExtractor={(tea: any) => tea}
              ItemSeparatorComponent={Divider}
            />
          )} */}
        </View>
      </Screen>
    </Modal>
  );
}

const Card = ({ item, onSelect }: any) => {
  return (
    <List.Item
      {...item}
      onPress={() => onSelect(`${item.title}${item.description ? `, ${item.description}` : ''}`)}
      // left={(props) => (
      //   <Avatar.Image
      //     {...props}
      //     style={{ ...props.style, backgroundColor: 'white' }}
      //     size={40}
      //     source={{
      //       uri: item.image,
      //     }}
      //   />
      // )}
    />
  );
};

const tea = ['Essiac tea', 'green tea', 'Ginger tea', 'Lavender tea', 'Matcha tea', 'Turmeric tea'];

// const types = [
//   {
//     name: 'Surgery',
//     image:
//       'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/lungs_1fac1.png',
//     value: '🫁',
//   },
//   {
//     name: 'Chemo',
//     image:
//       'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/lungs_1fac1.png',
//     value: '🫁',
//   },
//   {
//     name: 'Radiation',
//     image:
//       'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/lungs_1fac1.png',
//     value: '🫁',
//   },
//   {
//     name: 'Essential Oils',
//     image:
//       'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/lungs_1fac1.png',
//     value: '🫁',
//   },
//   {
//     name: 'Acupunture',
//     image:
//       'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/lungs_1fac1.png',
//     value: '🫁',
//   },
// ];

// const subTypes = [
//   {
//     type: 'Surgery',
//     name: 'Leg',
//     image:
//       'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/leg_1f9b5.png',
//     value: '🦵',
//   },
//   {
//     type: 'Chemo',
//     name: 'Foot',
//     image:
//       'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/foot_1f9b6.png',
//     value: '🦶',
//   },
//   {
//     type: 'Radiation',
//     name: 'Brain',
//     image:
//       'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/brain_1f9e0.png',
//     value: '🧠',
//   },
//   {
//     type: 'Essential Oils',
//     name: 'Lungs',
//     image:
//       'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/lungs_1fac1.png',
//     value: '🫁',
//   },
//   {
//     type: 'Acupunture',
//     name: 'Mouth',
//     image:
//       'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/mouth_1f444.png',
//     value: '👄',
//   },
// ];
