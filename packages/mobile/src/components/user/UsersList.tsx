import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Divider, TextInput, ActivityIndicator } from 'react-native-paper';
// import { useGetAllUser } from '@frontend/shared/hooks/users';
import palette from '@frontend/shared/config/colors';
import UserCard from './UserCard';

export default function UsersList() {
  return (
    <View>
      <Text>Users</Text>
    </View>
  );
  // const { allData, handleUpdateUserStatus, filter, setFilter, loading } = useGetAllUser();
  // return (
  //   <View style={{ flex: 1 }}>
  //     <TextInput
  //       mode="outlined"
  //       label="Search"
  //       placeholder="Search name or email"
  //       value={filter.search}
  //       onChangeText={(value) => setFilter({ ...filter, search: value })}
  //       right={
  //         <TextInput.Icon
  //           onPress={() => setFilter({ ...filter, search: '' })}
  //           name={filter.search ? 'close' : 'magnify'}
  //         />
  //       }
  //     />
  //     {loading ? (
  //       <ActivityIndicator
  //         style={{ marginTop: 50 }}
  //         size="large"
  //         animating={true}
  //         color={palette.primary.main}
  //       />
  //     ) : (
  //       <FlatList
  //         data={allData.users}
  //         renderItem={(props) => (
  //           <UserCard {...props} handleUpdateUserStatus={handleUpdateUserStatus} />
  //         )}
  //         keyExtractor={(user: any) => user._id}
  //         ItemSeparatorComponent={Divider}
  //       />
  //     )}
  //   </View>
  // );
}
