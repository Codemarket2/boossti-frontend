import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  useWindowDimensions,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const LoginPage = () => {
  const width = Dimensions.get('screen').width;
  const layout = useWindowDimensions();
  const inputEl = React.useRef(null);

  const [email, onChangeEmail] = React.useState(null);
  const [fName, onChangeFName] = React.useState(null);
  const [lName, onChangeLName] = React.useState(null);
  const [number, onChangeNumber] = React.useState('+1');
  const [password, onChangePassword] = React.useState(null);
  const [index, setIndex] = React.useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#6301ee'} />
      <View style={{ marginTop: 35 }}>
        <TextInput style={styles.input} value={email} placeholder="email" />
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry={true}
          placeholder="password"
        />
        <View style={{ width: width * 0.93, margin: 15 }}>
          <Button title="Sign In" color="#673ab7" />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          <View>
            <Text
              style={{ width: 50, textAlign: 'center', backgroundColor: 'white', color: 'black' }}
            >
              OR
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        </View>
        <View
          style={{
            backgroundColor: '#db4437',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 13,
            height: width * 0.1,
          }}
        >
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name="google-plus" size={25} style={{ color: 'white', marginRight: 10 }} />
            <Text style={{ color: 'white', fontWeight: '700' }}>SIGN IN WITH GOOGLE</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#4267b2',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 13,
            marginRight: 13,
            height: width * 0.1,
          }}
        >
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome
              name="facebook-square"
              size={25}
              style={{ color: 'white', marginRight: 10 }}
            />
            <Text style={{ color: 'white', fontWeight: '700' }}>SIGN IN WITH FACEBOOK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 10,
    borderColor: '#b8babc',
    borderWidth: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default LoginPage;
